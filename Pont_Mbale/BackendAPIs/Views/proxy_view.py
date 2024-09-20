import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
import json

@extend_schema(
    responses={200: 'Proxy request successfully handled', 400: 'Bad Request', 500: 'Internal Server Error'},
)
@api_view(['POST'])
def proxy_api_view(request):
    try:
        body = json.loads(request.body)
        target_url = body.get('url')
        method = body.get('method', 'GET').upper()
        headers = body.get('headers', {})
        data = body.get('data', None)
        params = body.get('params', None)

        if not target_url:
            return Response({'error': 'URL is required'}, status=status.HTTP_400_BAD_REQUEST)

        response = requests.request(
            method=method,
            url=target_url,
            headers=headers,
            data=json.dumps(data) if data else None,
            params=params
        )
        
        return Response(response.content, status=response.status_code, headers=response.headers)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
