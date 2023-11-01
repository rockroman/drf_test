from turtle import title
from urllib import response
from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase


class PostListTest(APITestCase):
    def setUp(self) -> None:
        User.objects.create(
            username="rock",
            password="myPass"
        )

    def test_can_list_posts(self):
        rock = User.objects.get(username="rock")
        Post.objects.create(
            owner=rock,
            title="A test title",
        )
        response = self.client.get("/posts/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_post(self):
        # self.client.login(username="rock", password="myPass")
        rock = User.objects.get(username="rock")
        self.client.force_login(rock)
        response = self.client.post("/posts/", {"title": "test title"})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_needs_to_be_logged_to_create(self):
        response = self.client.post("/posts/", {"title": "no no "})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PostDetailTest(APITestCase):
    def setUp(self) -> None:
        rock = User.objects.create(
            username="rock",
            password="pass",
        )

        black = User.objects.create(
            username="black",
            password="pass2",
        )

        Post.objects.create(owner=rock, title="rock title", content="rock content")
        Post.objects.create(owner=black, title="black title", content="black content")

    def test_can_get_post_using_valid_id(self):
        response = self.client.get("/post/1/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_get_post_with_invalid_id(self):
        response = self.client.get("/post/96/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)