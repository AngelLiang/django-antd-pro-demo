from .serializers import UserModelSerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
import json

from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    TokenAuthentication,
)
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def list(self, request, *args, **kwargs):
        page = request.GET.get('current')  # type: str
        per_page = request.GET.get('pageSize')  # type: str
        sorter = request.GET.get('sorter')  # type: dict()
        filter_ = request.GET.get('filter')  # type: dict()

        print((page, per_page, sorter, filter_))

        response = super().list(request, *args, **kwargs)
        total = self.queryset.count()
        return JsonResponse({
            'total': total,
            'data': response.data
        })

    def get_queryset(self):
        queryset = self.queryset
        filter_ = self.request.query_params.get('filter', None)
        if filter_:
            if isinstance(filter_, str):
                filter_ = json.loads(filter_)
            queryset = queryset.filter(**filter_)
        return queryset


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
