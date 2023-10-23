from django.shortcuts import redirect
from django.views import View


class IndexMain(View):
    def get(self, req):
        return redirect('blog:blog_index')
