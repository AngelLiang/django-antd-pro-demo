from .serializers import UserModelSerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

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
        response = super().list(request, *args, **kwargs)
        return JsonResponse({
            'data': response.data
        })


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
