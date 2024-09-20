from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from BackendAPIs.BackendModels.contentgallery_model import Content_Gallery
from BackendAPIs.Serializers.contentgallery_serializers import ContentGallerySerializer, ContentGallerySerializerViews
from drf_spectacular.utils import extend_schema

@extend_schema(responses=ContentGallerySerializerViews)
@api_view(['GET'])
def content_gallery_list(request):
    if request.method == 'GET':
        content_galleries = Content_Gallery.objects.all()
        serializer = ContentGallerySerializerViews(content_galleries, many=True)
        return Response(serializer.data)

@extend_schema(responses=ContentGallerySerializer)
@api_view(['POST'])
def content_gallery_create(request):
    if request.method == 'POST':
        serializer = ContentGallerySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=ContentGallerySerializer)
@api_view(['GET', 'PUT', 'DELETE'])
def content_gallery_detail(request, pk):
    try:
        content_gallery = Content_Gallery.objects.get(pk=pk)
    except Content_Gallery.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContentGallerySerializer(content_gallery)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ContentGallerySerializer(content_gallery, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        content_gallery.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
