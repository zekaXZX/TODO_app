from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import TODO_data
# Create your tests here.

class TodoModelTest(TestCase):

    def test_create_task(self):

        user = User.objects.create_user(
            username="testuser",
            password="12345"
        )

        task = TODO_data.objects.create(
            user=user,
            title="TEST1",
            description="TEST1",
            category="study"
        )

        self.assertEqual(task.title, "TEST1")
        self.assertEqual(task.description, "TEST1")
        self.assertEqual(task.user, user)

class TaskAccessTest(TestCase):

    def test_user_only_sees_own_tasks(self):

        user1 = User.objects.create_user(
            username="user1",
            password="12345"
        )

        user2 = User.objects.create_user(
            username="user2",
            password="12345"
        )


        TODO_data.objects.create(
            user=user1,
            title="User 1 task"
        )

        TODO_data.objects.create(
            user=user2,
            title="User 2 task"
        )


        self.client.login(
            username="user1",
            password="12345"
        )


        response = self.client.get(reverse("home"))


        self.assertContains(
            response,
            "User 1 task"
        )

        self.assertNotContains(
            response,
            "User 2 task"
        )

    def test_task_category(self):

        user = User.objects.create_user(
            username="test",
            password="12345"
        )

        task = TODO_data.objects.create(
            user=user,
            title="Shopping",
            category="shopping"
        )


        self.assertEqual(
            task.category,
            "shopping"
        )

class AuthenticationTest(TestCase):

    def test_login(self):

        user = User.objects.create_user(
            username="test",
            password="password123"
        )


        login = self.client.login(
            username="test",
            password="password123"
        )


        self.assertTrue(login)
