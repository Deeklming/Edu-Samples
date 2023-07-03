# blog/forms.py
# from django import forms
# from .models import User
from django.contrib.auth import get_user_model #직접 설정한것 들고옴
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

User = get_user_model()

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        # fields = ['email', 'name', 'password']
        fields = UserCreationForm.Meta.fields + ('email',)

class LoginForm(AuthenticationForm):
    class Meta:
        model = User
        # fields = ['email', 'password']
