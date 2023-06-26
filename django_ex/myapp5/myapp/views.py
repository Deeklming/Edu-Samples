from django.shortcuts import render, redirect
from django.views import View
from django.urls import reverse_lazy, reverse

# Create your views here.
class IndexMain(View):
    def get(self, req):
        return render(req, 'index.html')
