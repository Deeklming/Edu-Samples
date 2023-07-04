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
    path('generic/detail/<int:pk>/edit/', views.Update.as_view(), name='generic_edit'),
    path('generic/detail/<int:pk>/delete/', views.Delete.as_view(), name='generic_delete'),

    path('detail/<int:pk>/', views.DetailView2.as_view(), name='cm_detail'),
    path('detail/<int:pk>/comment/write/', views.CommentWrite.as_view(), name='cm_write'),
    path('detail/comment/<int:pk>/delete/', views.CommentDelete.as_view(), name='cm_delete'),

    path('detail/<int:pk>/hashtag/write/', views.TagWrite.as_view(), name='hashtag_write'),
    path('detail/hashtag/<int:pk>/delete/', views.TagDelete.as_view(), name='hashtag_delete'),


    path('mixin/', views.MixinIndex.as_view(), name='mixin_list'),
    path('mixin/<int:pk>/', views.MixinDetail.as_view(), name='mixin_detail'),
    path('mixin/write/', views.MixinWrite.as_view(), name='mixin_write'),
    path('mixin/<int:pk>/delete/', views.MixinDelete.as_view(), name='mixin_delete'),
]