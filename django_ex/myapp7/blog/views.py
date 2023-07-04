from typing import Any, Dict
from django.shortcuts import render, redirect
# from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from .models import Post, Comment, HashTag
from .forms import PostForm, CommentForm, HashTagForm
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin

"""
class MixinIndex(LoginRequiredMixin, View): # 로그인 한 사용자만 할수 있게 할때
    def get(self, req):
        posts = Post.objects.filter(writer=req.user)
        context = {
            "posts": posts
        }
        return render(req, 'blog/mixin_list.html', context)
"""

class MixinIndex(View):
    def get(self, request):
        post_objs = Post.objects.all()
        context = {
            "posts": post_objs
        }
        return render(request, 'blog/mixin_list.html', context)

class MixinWrite(LoginRequiredMixin, View): # LoginRequiredMixin은 로그인 한 사용자만 접근가능하게 함
    def get(self, req):
        form = PostForm()
        context = {
            "form": form
        }
        return render(req, 'blog/mixin_form.html', context)

    def post(self, req):
        form = PostForm(req.POST)
        if form.is_valid():
            post = form.save(commit=False) # commit=False는 변수 할당만 우선하고 이후에 수정가능하게 함
            post.writer = req.user
            post.save()
            return redirect('blog:mixin_list')
        form.add_error(None, '폼이 유효하지 않음')
        context = {
            "form": form
        }
        return render(req, 'blog/mixin_form.html', context)

class MixinDetail(View):
    def get(self, req, pk):
        post = Post.objects.get(pk=pk)
        comments = Comment.objects.filter(post=post)
        hashtags = HashTag.objects.filter(post=post)
        comment_form = CommentForm()
        hashtag_form = HashTagForm()

        context = { # 렌더링 미리 하는 부분
            'post': post,
            'comments': comments,
            'comment_form': comment_form,
            'hashtags': hashtags,
            'hashtag_form': hashtag_form,
        }

        return render(req, 'blog/mixin_detail.html', context)

class MixinDelete(LoginRequiredMixin, View):
    def post(self, req, pk): # post_id
        post = Post.objects.get(pk=pk)
        post.delete()
        return redirect('blog:mixin_list')

class MixinUpdate(LoginRequiredMixin, View):
    def get(self, req, pk):
        post = Post.objects.get(pk=pk)
        form = PostForm(initial={'title': post.title, 'content': post.content})
        context = {
            "form": form,
            'post': post
        }
        return render(req, 'blog/mixin_edit.html', context)
    
    def post(self, req, pk):
        post = Post.objects.get(pk=pk)
        form = PostForm(req.POST)
        if form.is_valid():
            post.title = form.changed_data['title']
            post.content = form.changed_data['content']
            post.save()
            return redirect('blog:mixin_detail')
        
        form.add_error('MixinUpdate 폼이 유효하지 않음')
        context = {
            "form": form
        }
        return render(req, 'blog/form_error.html', context)




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


class DetailView2(View):
    def get(self, req, pk):
        post = Post.objects.get(pk=pk)
        comments = Comment.objects.filter(post=post)
        hashtags = HashTag.objects.filter(post=post)
        comment_form = CommentForm()
        hashtag_form = HashTagForm()

        context = { # 렌더링 미리 하는 부분
            'post': post,
            'comments': comments,
            'comment_form': comment_form,
            'hashtags': hashtags,
            'hashtag_form': hashtag_form,
        }

        return render(req, 'blog/post_detail.html', context)


class CommentWrite(View):
    def post(self, req, pk):
        form = CommentForm(req.POST)
        if form.is_valid():
            content = form.cleaned_data['content'] # 사용자에게 댓글 내용 받아옴
            post = Post.objects.get(pk=pk) # 해당 아이디의 글 불러옴
            writer = req.user
            comment = Comment.objects.create(post=post, content=content, writer=writer) #create메서드 사용하면 save()필요 없음
            return redirect('blog:cm_detail', pk=pk)
        
        form.add_error('CommentWrite 폼이 유효하지 않음')
        context = {
            "form": form
        }
        return render(req, 'blog/mixin_detail.html', context)


class CommentDelete(View):
    def post(self, req, pk):
        comment = Comment.objects.get(pk=pk)
        post_id = comment.post.id
        comment.delete() #삭제
        return redirect('blog:mixin_detail', pk=post_id)


class TagWrite(View):
    def post(self, req, pk):
        form = HashTagForm(req.POST)
        if form.is_valid():
            c_name = form.cleaned_data['name']
            post = Post.objects.get(pk=pk)
            writer = req.user
            tag = HashTag.objects.create(post=post, name=c_name, writer=writer)
            return redirect('blog:mixin_detail', pk=pk)
        form.add_error('TagWrite 폼이 유효하지 않음')
        context = {
            "form": form
        }
        return render(req, 'blog/mixin_detail.html', context)


class TagDelete(View):
    def post(self, req, pk): # tag_id
        tag = HashTag.objects.get(pk=pk)
        post_id = tag.post.id
        tag.delete()
        return redirect('blog:mixin_detail', pk=post_id)
