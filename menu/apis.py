import os
import json

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response


class MenuView(APIView):
    def get(self, request, *args, **kwargs):
        data_json = os.path.join(settings.BASE_DIR, 'menu', 'menu.json')
        with open(data_json, encoding='utf-8') as f:
            content = f.read()
        content = json.loads(content)
        return Response({
            'data': content
        })
