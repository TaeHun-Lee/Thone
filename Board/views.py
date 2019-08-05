from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from . import models

# Create your views here.
def index(request):
    return render(request, "index.html")

def logIn(request):
    newUser = models.User()
    userID = request.POST["ID"]
    userPassword = request.POST["PW"]
    newUser.username = userID
    newUser.password = userPassword
    newUser.date_created = timezone.datetime.now()
    newUser.save()
    return redirect("board", newUser.id)

def board(request, currentUser_id):
    modelObjects = models.User.objects
    context = {"objs" : modelObjects, "currentUser_id" : currentUser_id}
    return render(request, "board.html", context)

def post_board(request, user_id, currentUser_id):
    main_user = get_object_or_404(models.User, pk=user_id)
    post_users = models.Post.objects.filter(main_userObj = main_user)
    context = {"main_user" : main_user, "post_users" : post_users, "currentUser_id" : currentUser_id }
    return render(request, "post_board.html", context)

def new_subPost(request, user_id, currentUser_id):
    subPost = models.Post()
    subPost.main_userObj = get_object_or_404(models.User, pk=user_id)
    subPost.post_userObj = get_object_or_404(models.User, pk=currentUser_id)
    subPost.title = request.POST["title"]
    subPost.body = request.POST["body"]
    subPost.post_created = timezone.datetime.now()
    subPost.save()
    return redirect("post_board", user_id, currentUser_id)