from rest_framework import serializers
from django.contrib.admin.models import LogEntry

class LogTableSerializers(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()
    action = serializers.SerializerMethodField()
    class Meta:
        model = LogEntry
        fields = '__all__'

    def get_user_details(self, obj):
        # Assuming LogEntry's `user` field links to your CustomUser model
        user = obj.user
        if user:
            return f"User Name {user.username} User Email {user.email}"
        return "Unknown User"

    def get_action(self, obj):
        return obj.get_action_flag_display()