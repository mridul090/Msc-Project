# from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.blog_model import BlogPost, Tag, Category
from BackendAPIs.Serializers.blog_serializers import BlogPostSerializer, BlogPostSerializerView, CategorySerializer, TagSerializer

# Create your views here.

# All blog post related create, update and delete API's

@extend_schema(responses=BlogPostSerializerView)
@api_view(['GET'])
def View_BlogPost(request):
    blogs = BlogPost.objects.all().order_by('-created_at')
    serializer = BlogPostSerializerView(blogs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses=BlogPostSerializerView)
@api_view(['GET'])
def View_blogs_by_category(request, category_id):
    try:
        blogpost = BlogPost.objects.get(category_id=category_id)
    except BlogPost.DoesNotExist:
        return Response({'error': 'BlogPost with the given category type ID does not exist.'},
                        status=status.HTTP_404_NOT_FOUND)
    serializer = BlogPostSerializerView(blogpost)
    if(serializer):
        return Response(serializer.data)
    else:
        return Response({'error': "request not supported"}, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=BlogPostSerializer)
@api_view(['DELETE'])
def Delete_BlogPost(request, pk):
    try:
        blogpost = BlogPost.objects.get(pk=pk)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    blogpost.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(responses=BlogPostSerializer)
@api_view(['POST'])
def Create_BlogPost(request):
    serializer = BlogPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(responses=BlogPostSerializer)
@api_view(['GET', 'PUT'])
def Update_BlogPost(request, pk):
    print(f"id received {pk}")
    try:
        blog = BlogPost.objects.get(pk=pk)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BlogPostSerializer(blog)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = BlogPostSerializer(blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': "request not supported"}, status=status.HTTP_400_BAD_REQUEST)



# Tag API
@extend_schema(responses=TagSerializer)
@api_view(['GET'])
def View_tag(request):
    tag = Tag.objects.all()
    serializer = TagSerializer(tag, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses=TagSerializer)
@api_view(['POST'])
def Create_tag(request):
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Category API
@extend_schema(responses=CategorySerializer)
@api_view(['GET'])
def View_Category(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(responses=CategorySerializer)
@api_view(['POST'])
def Create_Category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)