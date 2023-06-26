from django.shortcuts import render, redirect
from django.views import View
from .models import User
from .forms import RegisterForm, LoginForm
from django.urls import reverse_lazy, reverse
from django.contrib.auth import authenticate, login, logout

# Create your views here.
class Registeration(View):
    def get(self, req):
        form = RegisterForm()
        context = {
            'form': form
        }
        return render(req, 'user/user_register.html', context)

    def post(self, req):
        form = RegisterForm(req.POST)
        if form.is_valid():
            user = form.save()
            # 로그인 먼저 한 다음 이동이 좋음
            return redirect("blog:generic_list")

class Login(View):
    def get(self, req):
        if req.user.is_authenticated:
            return redirect('blog:generic_list')
        
        form = LoginForm()
        context = {
            'form': form
        }
        return render(req, 'user/user_login.html', context)

    def post(self, req):
        if req.user.is_authenticated:
            return redirect('blog:generic_list')
        
        form = LoginForm(req.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(username=email, password=password) #bool 반환
            
            if user:
                login(req, user)
                return redirect("blog:generic_list")
            
            form.add_error(None, 'ID가 없음')
        
        context = {
            'form': form #error가 들어감 form임
        }
        return render(req, 'user/user_login.html', context)

class Logout(View):
    def get(self, req):
        logout(req)
        return redirect("blog:generic_list")