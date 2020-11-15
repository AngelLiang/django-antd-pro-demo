from django.urls import path
from rest_framework.routers import DefaultRouter

from .apis import MenuView

urlpatterns = [
    path('', MenuView.as_view()),
]
