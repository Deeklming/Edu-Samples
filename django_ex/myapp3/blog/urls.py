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
    path('generic/detail/<int:pk>/edit', views.Update.as_view(), name='generic_edit'),
    path('generic/detail/<int:pk>/delete', views.Delete.as_view(), name='generic_delete'),
    # path('generic/comments/write', views.index),
    # path('generic/comments/delete', views.index),
]