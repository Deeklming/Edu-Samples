from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=30)
    content = models.TextField()
    writer = models.ForeignKey(User, on_delete=models.CASCADE) # 1:n의 관계로 사용
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE) # 외래키, 1:n
    content = models.TextField()
    writer = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Comment on {self.post.title}"


class HashTag(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    name = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.name