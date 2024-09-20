from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from BackendAPIs.BackendModels.setting_model import Settings
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def sending_email(request, pk):
    try:
        # Get data from the request
        user_Firstname = request.data.get('first_name')
        user_Lastname = request.data.get('last_name')
        user_Email = request.data.get('email')
        message_Subject = request.data.get('subject')
        message = request.data.get('message')

        # Construct the message
        send_message = (
            f"Sender Name: {user_Firstname} {user_Lastname} \n"
            f"Sender Email: {user_Email} \n"
            f"Sender Message: {message}"
        )

        # Get the email list from the Settings model
        settings_data = Settings.objects.get(id=1)
        emails_list = [e.strip() for e in settings_data.responsible_emails.split(',') if e.strip()]

        # Send the email
        for email in emails_list:
            send_mail(
                subject=f"Forwarded Message: {message_Subject}",
                message=send_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )

        # Return success response if the email is sent
        return Response({"detail": "Email sent successfully."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Log the error if needed, and return a 500 response
        print(f"Error while sending email: {e}")
        return Response({"detail": "Failed to send email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


