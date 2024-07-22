import json

class PrintRequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'POST':
            try:
                body_unicode = request.body.decode('utf-8')
                body_data = json.loads(body_unicode)
                print(f'Request Body: {body_data}')
            except json.JSONDecodeError as e:
                print(f'Invalid JSON: {e}')
            except Exception as e:
                print(f'Error reading body: {e}')

        response = self.get_response(request)
        return response
