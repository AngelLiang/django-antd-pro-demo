from django.urls import path
from rest_framework.routers import DefaultRouter

from .auth_token import TokenCreateView, TokenDeleteView
from .apis import UserViewSet, CurrentUserView
from .apis import GroupViewSet

urlpatterns = [
    path('login/', TokenCreateView.as_view()),
    path('logout/', TokenDeleteView.as_view()),
    path('currentUser/', CurrentUserView.as_view()),
]

router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'group', GroupViewSet)
urlpatterns += router.urls
