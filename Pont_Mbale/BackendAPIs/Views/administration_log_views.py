from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.admin.models import LogEntry
from BackendAPIs.Serializers.administration_log_serializers import LogTableSerializers


@api_view(['GET'])
def LogTableViews(request):
    queryset = LogEntry.objects.all()
    serializer = LogTableSerializers(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)