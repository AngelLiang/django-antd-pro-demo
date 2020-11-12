from .serializers import UserModelSerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
