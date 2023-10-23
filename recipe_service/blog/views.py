from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from .models import Post, Comment
from .forms import PostForm, CommentForm

# Create your views here.
class BlogIndex(View):
    def get(self, req):
        posts = Post.objects.all()
        context = {
            "posts": posts,
        }
        return render(req, 'blog/blog_index.html', context)

class BlogView(View):
    def get(self, req, post_id):
        post = Post.objects.get(pk=post_id)
        # comments = Comment.objects.filter(post=post)
        # comment_form = CommentForm()

        context = {
            'post': post,
            # 'comments': comments,
            # 'comment_form': comment_form,
        }
        # comments = Comment.objects.select_related('writer').filter(post_pk=pk)
        post.click_count += 1
        post.save()
        return render(req, 'blog/blog_view.html', context)

class BlogWrite(View):
    def get(self, req):
        form = PostForm()
        context = {
            "form": form
        }
        return render(req, 'blog/blog_write.html', context)

    def post(self, req):
        form = PostForm(req.POST)
        if form.is_valid():
            post = form.save(commit=False) # commit=False는 변수 할당만 우선하고 이후에 수정가능하게 함
            # post.writer = req.user
            post.save()
            return redirect('blog:blog_index')
        form.add_error(None, '쓰기 폼이 유효하지 않음')
        context = {
            "form": form
        }
        return render(req, 'error.html', context)

class BlogUpdate(View):
    def get(self, req, post_id):
        post = get_object_or_404(Post, pk=post_id)
        form = PostForm(initial={'title': post.title, 'content': post.content})
        context = {
            "form": form,
            'post': post,
        }
        return render(req, 'blog/blog_update.html', context)
    
    def post(self, req, post_id):
        post = get_object_or_404(Post, pk=post_id)
        form = PostForm(req.POST)

        if form.is_valid():
            print('444')
            post.title = form.cleaned_data['title']
            post.content = form.cleaned_data['content']
            post.save()
            return redirect('blog:blog_view', post_id=post_id)
        
        context = {
            "form": form
        }
        return render(req, 'blog/blog_update.html', context)

class BlogDelete(View):
    def post(self, req, post_id):
        post = Post.objects.get(pk=post_id)
        post.delete()
        return redirect('blog:blog_index')

class BlogSearch(View):
    def post(self, req, post_id):
        pass
    