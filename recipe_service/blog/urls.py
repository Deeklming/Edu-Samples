# blog/urls.py
from django.urls import path
from . import views
# from blog.views import Index

app_name = 'blog'

urlpatterns = [
    path('', views.BlogIndex.as_view(), name='blog_index'),
    path('write/', views.BlogWrite.as_view(), name='blog_write'),
    path('view/<int:post_id>', views.BlogView.as_view(), name='blog_view'),
    path('update/<int:post_id>/', views.BlogUpdate.as_view(), name='blog_update'),
    path('delete/<int:post_id>/', views.BlogDelete.as_view(), name='blog_delete'),
]
