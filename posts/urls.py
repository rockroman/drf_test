from django.contrib import admin
from django.urls import path, include
from posts import views

urlpatterns = [
    path("posts/", views.PostList.as_view()),
    path("post/<int:pk>/", views.PostDetail.as_view())

]
