from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from rest_framework.parsers import MultiPartParser, FormParser
from BackendAPIs.BackendModels.setting_model import ImageLibrary, Settings
from BackendAPIs.Serializers.setting_serializers import ImageLibrarySerializers, SettingsSerializers

@extend_schema(responses=ImageLibrarySerializers)
@api_view(["POST", "GET"])
def upload_view_images(request):
    if request.method == 'POST':
        parser_classes = [MultiPartParser, FormParser]
        serializer = ImageLibrarySerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        image_data = ImageLibrary.objects.all()
        serializer = ImageLibrarySerializers(image_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@extend_schema(responses=ImageLibrarySerializers)
@api_view(["PUT", "DELETE"])
def update_delete_images(request, pk):
    try:
        imagelibrary = ImageLibrary.objects.get(pk=pk)
    except ImageLibrary.DoesNotExist:
        return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':

        serializer = ImageLibrarySerializers(imagelibrary, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        imagelibrary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@extend_schema(responses=SettingsSerializers)
@api_view(["POST", "GET", "PUT"])
def create_update_settings(request, pk):
    # Check if any Settings record exists
    setting = Settings.objects.first()

    if request.method == 'POST':
        if not setting:
            # If no settings record exists, create one
            serializer = SettingsSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # If a setting record already exists, return a 400 response
            return Response({'error': 'Settings record already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        if setting:
            serializer = SettingsSerializers(setting)
            return Response(serializer.data)
        else:
            return Response({'error': 'No settings record found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        if setting:
            serializer = SettingsSerializers(setting, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'No settings record found to update'}, status=status.HTTP_404_NOT_FOUND)


# @extend_schema(responses=SettingsSerializers)
# @api_view(["POST", "GET", "PUT"])
# def create_update_settings(request, pk=1):
#     try:
#         setting = Settings.objects.get(pk=pk)
#     except Settings.DoesNotExist:
#         setting = None
#
#     if request.method == 'POST':
#         if setting:
#             return Response({'error': 'Settings record already exists.'}, status=status.HTTP_400_BAD_REQUEST)
#         serializer = SettingsSerializers(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     if request.method == 'GET':
#         if not setting:
#             return Response({'error': 'Settings data not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = SettingsSerializers(setting)
#         return Response(serializer.data)
#
#     if request.method == 'PUT':
#         if not setting:
#             serializer = SettingsSerializers(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#         serializer = SettingsSerializers(setting, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)