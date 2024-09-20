from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.Projects.progressbar_model import ProgressiveBar
from BackendAPIs.Serializers.Projects.progressbar_serializers import ProgressiveBarSerializers


@extend_schema(responses=ProgressiveBarSerializers)
@api_view(['GET','POST'])
def progressbar_views(request):
    if request.method == 'GET':
        progressbar = ProgressiveBar.objects.all()
        serializer = ProgressiveBarSerializers(progressbar, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProgressiveBarSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(responses=ProgressiveBarSerializers)
@api_view(['GET', 'PUT', 'DELETE'])
def modify_progressbar(request, pk):
    try:
        progressbar = ProgressiveBar.objects.get(pk=pk)
    except ProgressiveBar.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProgressiveBarSerializers(progressbar)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProgressiveBarSerializers(progressbar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        progressbar.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

