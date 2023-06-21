from django.shortcuts import render, redirect
# from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView, CreateView, DetailView
from .models import Post
from .forms import PostForm
from django.urls import reverse_lazy

# Create your views here.
# def index(req):
#     if req.method == "GET":
#         return HttpResponse('index page get')
    
#     # 에러 처리 해주는 것이 좋음
#     return HttpResponse('No~!~!~~')

class Index(View):
    def get(self, req):
        # return HttpResponse('index page get class')
        # DB에 접근해서 필요한 것 처리 후 렌더링

        post_objs = Post.objects.all() # db에서 전부 가져옴
        context = { # 데이터 가공
            "posts": post_objs
        }
        return render(req, 'blog/board.html', context)

def write(req):
    if req.method == 'POST':
        # form 확인
        form = PostForm(req.POST)
        if form.is_valid():
            post = form.save()
            return redirect('blog:list')
    else:
        form = PostForm()
        return render(req, 'blog/write.html', {'form': form})

# generic - django 자체의 클래스 뷰 기능
class List(ListView):
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'

class Write(CreateView):
    model = Post
    form_class = PostForm
    success_url = reverse_lazy('blog:generic_list') # 성공시 보내줄 url

class Detail(DetailView):
    model = Post
    template_name = "blog/post_detail.html"
    context_object_name = 'post'
