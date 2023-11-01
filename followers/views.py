from django.shortcuts import render
from .models import Follower
from rest_framework import generics, permissions
from drf_API.permissions import IsOwnerOrReadOnly
from .serializers import FollowersSerializer


class FollowersList(generics.ListCreateAPIView):
    serializer_class = FollowersSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Follower.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FollowersDetail(generics.RetrieveDestroyAPIView):
    serializer_class = FollowersSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Follower.objects.all()
