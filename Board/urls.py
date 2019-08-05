from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('logIn/', views.logIn, name="logIn"),
    path('board/<int:currentUser_id>/', views.board, name="board"),
    path('post_board/<int:user_id>/<int:currentUser_id>/', views.post_board, name="post_board"),
    path('new_subPost/<int:user_id>/<int:currentUser_id>/', views.new_subPost, name="new_subPost"),
]
