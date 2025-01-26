import webview
from hikvisionapi import Client


class Api:

    def simplecheck(self, ip, username, password):
        try:
            cam = Client(ip, username, password)
            response = cam.System.deviceInfo(method='get', present='text')
            print(response)
            return response
        except Exception as e:
            # Catch any error and return the error message as the response
            error_message = f"Error: {str(e)}"
            print(error_message)
            return error_message




# Create a PyWebView window and load the UI
if __name__ == '__main__':
    api = Api()  # Initialize the API object
    window = webview.create_window('DVRCheck', 'ui/index.html',width=800,height=800, js_api=api)
    webview.start(icon='app_icon.ico')
