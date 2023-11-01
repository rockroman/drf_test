from urllib import request
from django.forms import ValidationError
from rest_framework import serializers
from .models import Post
from likes.models import Like


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")
    is_owner = serializers.SerializerMethodField()
    likes_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        if value.size > (1024 * 1024) * 2:
            raise serializers.ValidationError("Image size larger than 2MB")
        if value.image.width > 4000:
            raise serializers.ValidationError("image width larger then 4000px")
        if value.image.height > 4000:
            raise serializers.ValidationError("image height larger then 4000px")
        return value

    def get_is_owner(self, obj):
        request = self.context["request"]
        return request.user == obj.owner

    def get_likes_id(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            likes = Like.objects.filter(owner=user, post=obj).first()
            return likes.id if likes else None
        return None

    class Meta:
        model = Post
        fields = [
            "id",
            "owner",
            "created_at",
            "updated_at",
            "title",
            "content",
            "image",
            "profile_id",
            "profile_image",
            "is_owner",
            "image_filter",
            "likes_id",
            "comments_count",
            "likes_count",
        ]
