from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from BackendAPIs.BackendModels.About_Pont.historycontent_model import HistoryContent
from BackendAPIs.Serializers.About_Pont.historycontent_serializers import HistoryContentSerializer,HistoryContentSerializerViews
from drf_spectacular.utils import extend_schema

@extend_schema(responses=HistoryContentSerializerViews)
@api_view(['GET'])
def historycontent_views(request):
     historycontents = HistoryContent.objects.all()
     serializer = HistoryContentSerializerViews(historycontents, many=True)
     return Response(serializer.data)

@extend_schema(responses=HistoryContentSerializer)
@api_view(['GET', 'POST'])
def historycontent_list(request):
    if request.method == 'GET':
        historycontents = HistoryContent.objects.all()
        serializer = HistoryContentSerializer(historycontents, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = HistoryContentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(responses=HistoryContentSerializer)
@api_view(['GET', 'PUT', 'DELETE'])
def historycontent_detail(request, pk):
    try:
        historycontent = HistoryContent.objects.get(pk=pk)
    except HistoryContent.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HistoryContentSerializer(historycontent)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = HistoryContentSerializer(historycontent, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        historycontent.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
