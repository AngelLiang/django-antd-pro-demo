import json

from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import Group

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
from .serializers import UserModelSerializer
from .serializers import UserCreateSerializer
from .serializers import GroupModelSerializer
from .permissions import CustomDjangoModelPermissions

User = get_user_model()


class GroupViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPageNumberPagination
    serializer_class = GroupModelSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    authentication_classes = [
        TokenAuthentication
    ]
    permission_classes = [
        CustomDjangoModelPermissions
    ]
    queryset = Group.objects.all()


class UserViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPageNumberPagination
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ('username', 'first_name', 'last_name', 'email')
    authentication_classes = [
        TokenAuthentication
    ]
    permission_classes = [
        CustomDjangoModelPermissions
    ]

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
