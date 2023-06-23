# blog/forms.py
from django import forms
from .models import Post, Comment, HashTag

# class PostForm(forms.ModelForm):
#     class Meta:
#         model = Post
#         fields = ('title', 'writer',)
#         widget = {
#             'content': forms.widgets.Textarea
#         }

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
        widgets = {
            'content': forms.Textarea(attrs={'class': 'form-control', 'rows': '10', 'cols': '50'})
        }

class HashTagForm(forms.ModelForm):
    class Meta:
        model = HashTag
        fields = ['name']
