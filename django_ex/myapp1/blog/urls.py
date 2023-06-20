# blog/urls.py
from django.urls import path
from . import views # FBV
from blog.views import Index # CBV

urlpatterns = [
    # path('', views.index), # 함수 방식
    path('', Index.as_view()), # 클래스 방식
    # path('posts/board', views.index),
    # path('posts/write', views.index),
    # path('posts/update', views.index),
    # path('posts/delete', views.index),
    # path('comments/write', views.index),
    # path('comments/delete', views.index),
]