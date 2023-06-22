from typing import Any, Dict
from django.shortcuts import render, redirect
# from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from .models import Post, Comment
from .forms import PostForm, CommentForm
from django.urls import reverse_lazy, reverse

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


class Update(UpdateView):
    model = Post
    template_name = "blog/post_edit.html"
    fields = ['title', 'content']
    success_url = reverse_lazy('blog:generic_list')

    def get_initial(self): # -> Dict[str, Any]
        initial = super().get_initial() # UpdateView자체의 기능
        post = self.get_object() # pk 기반 객체를 가져옴
        initial['title'] = post.title
        initial['content'] = post.content
        return initial

    def get_success_url(self): # -> str, get_absolute_url로 대체 가능
        post = self.get_object()
        return reverse('blog:generic_detail', kwargs={'pk': post.pk})
    
    def get_absolute_url(self):
        pass


class Delete(DeleteView):
    model = Post
    success_url = reverse_lazy('blog:generic_list')


class DetailView(View):
    def get(self, req, post_id):
        post = Post.objects.get(pk=post_id)
        comments = Comment.objects.all()


class CommentWrite(View):
    # def get(self, req):
    #     pass
    def post(self, req, post_id):
        form = CommentForm(req.POST)
        if form.is_valid():
            content = form.cleaned_data['content'] # 사용자에게 댓글 내용 받아옴
            post = Post.objects.get(pk=post_id) # 해당 아이디의 글 불러옴
            comment = Comment.objects.create(post=post, content=content)
            return redirect('blog:generic_detail', pk=post_id)
