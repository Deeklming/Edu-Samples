# blog/urls.py
from django.urls import path
from . import views # FBV
from blog.views import Index # CBV

app_name = 'blog'

urlpatterns = [
    # path('', views.index), # 함수 방식
    # path('posts/board', views.index),
    path('', Index.as_view(), name='list'), # 클래스 방식
    path('write/', views.write, name='write'),
    
    path('generic/', views.List.as_view(), name='generic_list'),
    path('generic/write/', views.Write.as_view(), name='generic_write'),
    path('generic/detail/<int:pk>/', views.Detail.as_view(), name='generic_detail'),
    # path('posts/update', views.index),
    # path('posts/delete', views.index),
    # path('comments/write', views.index),
    # path('comments/delete', views.index),
]