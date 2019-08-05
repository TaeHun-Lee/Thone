from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    date_created = models.DateTimeField("Date Created")

    def __str__(self):
        return self.username

class Post(models.Model):
    main_userObj = models.ForeignKey('User', on_delete=models.CASCADE, related_name="main_user")
    post_userObj = models.ForeignKey('User', on_delete=models.CASCADE, related_name="post_user")
    title = models.CharField(max_length=50)
    post_created = models.DateTimeField("Post Created")
    body = models.TextField()

    def __str__(self):
        return self.title