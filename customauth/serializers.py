from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission, Group
from django.contrib.auth import get_user_model

from rest_framework import serializers

User = get_user_model()


class ContentTypeModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentType
        fields = '__all__'


class PermissionModelSerializer(serializers.ModelSerializer):

    content_type = ContentTypeModelSerializer()

    class Meta:
        model = Permission
        fields = '__all__'


class GroupModelSerializer(serializers.ModelSerializer):

    permissions = PermissionModelSerializer(many=True)

    class Meta:
        model = Group
        fields = '__all__'


class UserModelSerializer(serializers.ModelSerializer):

    groups = GroupModelSerializer(many=True)
    user_permissions = PermissionModelSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'
