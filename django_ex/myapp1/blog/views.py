from django.shortcuts import render
from django.http import HttpResponse
from django.views import View

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
        return render(req, 'blog/board.html')
    
    def post(self, req):
        pass