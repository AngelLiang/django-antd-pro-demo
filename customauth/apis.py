import json

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import Group, Permission

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    TokenAuthentication,
)
from .pagination import CustomPageNumberPagination
from .serializers import UserModelSerializer, UserCreateSerializer
from .serializers import GroupModelSerializer
from .serializers import PermissionModelSerializer
from .permissions import CustomDjangoModelPermissions

User = get_user_model()


class BaseViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPageNumberPagination
    filter_backends = (DjangoFilterBackend, SearchFilter)
    authentication_classes = [
        TokenAuthentication
    ]
    permission_classes = [
        CustomDjangoModelPermissions
    ]

    def list(self, request, *args, **kwargs):
        if 'all' in request.query_params and len(request.query_params.keys()) == 1:
            self.pagination_class = None
        return super().list(request, args, kwargs)


class GroupViewSet(BaseViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupModelSerializer


class PermissionViewSet(BaseViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionModelSerializer


class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    search_fields = ('username', 'first_name', 'last_name', 'email')

    @action(detail=False, methods=['post'], name='创建用户')
    def create_user(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid():
            # print(serializer.errors)
            if 'username' in serializer.errors:
                return Response({
                    'status': 'err',
                    'none_fields_errors': str(serializer.errors['username'][0]),
                })
            return Response({
                'status': 'err',
                'none_fields_errors': '创建失败，未知错误',
            })
        user = serializer.save()
        return Response({
            'status': 'ok',
            'id': user.pk,
            'name': user.get_full_name() or user.username,
        })

    # @action(detail=False)
    # def current_user(self, request):
    #     """当前登录用户信息"""
    #     user = request.user
    #     if user and not isinstance(user, AnonymousUser):
    #         content = {
    #             'status': 'ok',
    #             'id': user.pk,
    #             'name': user.get_full_name() or user.username,
    #         }
    #         return JsonResponse(content)
    #     else:
    #         return JsonResponse({
    #             'status': 'err',
    #             'none_fields_errors': '请先登录'
    #         }, status=403)


class CurrentUserView(APIView):

    authentication_classes = [
        TokenAuthentication
    ]

    def get(self, request, format=None):
        user = request.user
        if user and not isinstance(user, AnonymousUser):
            content = {
                'status': 'ok',
                'id': user.pk,
                'name': user.get_full_name() or user.username,
            }
            return JsonResponse(content)
        else:
            return JsonResponse({
                'status': 'err',
                'none_fields_errors': '请先登录'
            }, status=403)


current_uesr_view = CurrentUserView.as_view()
