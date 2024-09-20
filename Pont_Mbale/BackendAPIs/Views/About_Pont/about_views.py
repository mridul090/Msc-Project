from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.About_Pont.about_model import About
from BackendAPIs.Serializers.About_Pont.about_serializers import AboutSerializer,AboutSerializerViews

@extend_schema(responses=AboutSerializerViews)
@api_view(['GET'])
def about_list(request):
    abouts = About.objects.all()
    serializer = AboutSerializerViews(abouts, many=True)
    return Response(serializer.data)


@extend_schema(responses=AboutSerializer)
@api_view(['POST'])
def about_create(request):
    serializer = AboutSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=AboutSerializer)
@api_view(['GET', 'PUT', 'DELETE'])
def about_detail(request, pk):
    try:
        about = About.objects.get(pk=pk)
    except About.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AboutSerializer(about)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AboutSerializer(about, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        about.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
