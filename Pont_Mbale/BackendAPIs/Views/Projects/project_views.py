from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from drf_spectacular.utils import extend_schema
from BackendAPIs.BackendModels.Projects.project_model import ProjectsTypes, Projects
from BackendAPIs.Serializers.Projects.project_serializers import ProjectsTypesSerializers, ProjectsSerializersViews, ProjectsSerializers

extend_schema(responses=ProjectsSerializersViews)
@api_view(['GET'])
def get_projects(request):
    projects = Projects.objects.all()
    serializer = ProjectsSerializersViews(projects, many=True)
    return Response(serializer.data)

@extend_schema(responses=ProjectsSerializers)
@api_view(['POST'])
def post_projects(request):
    serializer = ProjectsSerializers(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return ValidationError({'project_types_error': 'A project with this project type already exists.'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=ProjectsSerializers)
@api_view(['GET', 'PUT', 'DELETE'])
def modify_projects(request, pk):
    try:
        project = Projects.objects.get(pk=pk)
    except Projects.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectsSerializers(project)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectsSerializers(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(responses=ProjectsTypesSerializers)
@api_view(['GET','POST'])
def project_type_views(request):
    if request.method == 'GET':
        project_type = ProjectsTypes.objects.all()
        serializer = ProjectsTypesSerializers(project_type, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProjectsTypesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(responses=ProjectsTypesSerializers)
@api_view(['GET', 'PUT', 'DELETE'])
def modify_project_type(request, pk):
    try:
        project_type = ProjectsTypes.objects.get(pk=pk)
    except ProjectsTypes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectsTypesSerializers(project_type)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProjectsTypesSerializers(project_type, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        project_type.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(responses=ProjectsSerializersViews)
@api_view(['GET'])
def get_project_by_type(request, project_type_id):
    try:
        project = Projects.objects.get(project_types_id=project_type_id)
    except Projects.DoesNotExist:
        return Response({'error': 'Project with the given project type ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProjectsSerializersViews(project)
    return Response(serializer.data, status=status.HTTP_200_OK)
