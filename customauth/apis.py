from .serializers import UserModelSerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model
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


class CurrentUserView(APIView):

    authentication_classes = [
        TokenAuthentication
    ]

    def get(self, request, format=None):
        user = request.user
        if user:
            content = {
                'status': 'ok',
                'id': user.pk,
                'name': user.get_full_name() or user.username,
            }
            return JsonResponse(content)
        else:
            return JsonResponse({
                'status': 'err',
                'detail': '没有登录'
            }, status=status.HTTP_200_OK)


current_uesr_view = CurrentUserView.as_view()
