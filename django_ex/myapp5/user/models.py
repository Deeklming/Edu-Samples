from django.db import models
from django.contrib.auth.models import AbstractUser #인증기능 상속을 위해

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=255) #unique는 유일값
    name = models.CharField(max_length=50, null=True, blank=True)
    password = models.CharField(max_length=50)
    registered_date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email' #이걸 해줘야 authenticate에서 인식함
    REQUIRED_FIELDS = [] #USERNAME_FIELD설정시 여기에 있으면 안됨

    def __str__(self) -> str:
        return self.name
