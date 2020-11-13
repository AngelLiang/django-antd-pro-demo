from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    TokenAuthentication,
)
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class TokenCreateView(ObtainAuthToken):
    """用户登录，获取帐号的token

    头部示例
    HTTP header:
        Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
    """

    # parser_classes = (FormParser, MultiPartParser)

    # @swagger_auto_schema(
    #     operation_summary='用户登录，获取帐号的token',
    #     operation_description='',
    #     # request_body=openapi.Schema(
    #     #     type=openapi.TYPE_OBJECT,
    #     #     properties={
    #     #         'username': openapi.Schema(
    #     #             in_=openapi.IN_BODY,
    #     #             type=openapi.TYPE_STRING,
    #     #             description='用户名'
    #     #         ),
    #     #         'password': openapi.Schema(
    #     #             in_=openapi.IN_BODY,
    #     #             type=openapi.TYPE_STRING,
    #     #             description='密码'
    #     #         ),
    #     #     }
    #     # )
    #     manual_parameters=[
    #         openapi.Parameter(
    #             name='username',
    #             in_=openapi.IN_FORM,
    #             type=openapi.TYPE_STRING,
    #             required=True,
    #             description='用户名',
    #         ),
    #         openapi.Parameter(
    #             name='password',
    #             in_=openapi.IN_FORM,
    #             type=openapi.TYPE_STRING,
    #             required=True,
    #             description='密码',
    #         ),
    #     ],
    # )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'userid': user.pk,
            'token': token.key,
            'name': user.get_full_name() or user.username,
            'email': user.email,
            # 配合前端的权限
            'status': 'ok',
            'type': 'account',
            'currentAuthority': ['admin', ],
        })


class TokenDeleteView(APIView):
    """用户登出，删除token
    """

    authentication_classes = [
        TokenAuthentication
    ]

    @swagger_auto_schema(
        operation_summary='用户登出，删除token',
        # operation_description='',
    )
    def delete(self, request, format=None):
        token = request.auth
        if token is None:
            content = {'status': 'err', 'detail': '没有token'}
            return Response(content)

        token.delete()  # 清除token
        content = {'status': 'ok', 'detail': '登出成功'}
        return Response(content)


delete_token_view = TokenDeleteView.as_view()
