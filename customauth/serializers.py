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

    # permissions = PermissionModelSerializer(many=True)

    class Meta:
        model = Group
        fields = '__all__'


class UserModelSerializer(serializers.ModelSerializer):

    # groups = GroupModelSerializer(many=True)
    # user_permissions = PermissionModelSerializer(many=True)

    class Meta:
        model = User
        exclude = ('password',)


class UserCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=80)
    password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('该用户名已经存在')
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('两次密码不一致')
        return data

    def create(self, validated_data):
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user
