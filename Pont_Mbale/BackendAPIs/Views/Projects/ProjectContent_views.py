from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.Projects.ProjectContent_model import ProjectContent
from BackendAPIs.Serializers.Projects.ProjectContent_serializers import ProjectContentSerializersViews, ProjectContentSerializers

@extend_schema(responses=ProjectContentSerializersViews)
@api_view(['GET'])
def get_project_content(request):
    project_content = ProjectContent.objects.all()
    serializer = ProjectContentSerializersViews(project_content, many=True)
    return Response(serializer.data)

@extend_schema(responses=ProjectContentSerializers)
@api_view(['POST'])
def post_project_content(request):
    serializer = ProjectContentSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=ProjectContentSerializers)
@api_view(['GET', 'PUT', 'DELETE'])
def modify_project_content(request, pk):
    try:
        project_content = ProjectContent.objects.get(pk=pk)
    except ProjectContent.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectContentSerializers(project_content)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectContentSerializers(project_content, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project_content.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)