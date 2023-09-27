import requests
from PIL import Image
from io import BytesIO

# Set the API endpoint URL
url = 'https://api.openai.com/v1/images/generations'

# Set the API key
api_key = 'sk.........e'

# Set the prompt and other parameters
prompt = 'an armchair in the shape of an avocado'
model = 'image-alpha-001'
num_images = 1
size = '256x256'
response_format = 'url'

# Set the request headers with the API key
headers = {'Authorization': 'Bearer ' + api_key}

# Set the request body with the prompt and parameters
body = {
    'model': model,
    'prompt': prompt,
    'num_images': num_images,
    'size': size,
    'response_format': response_format
}

# Make the API call
response = requests.post(url, json=body, headers=headers)

# Check the response status code
if response.status_code == 200:
    # Get the image URL from the response
    image_url = response.json()['data'][0]['url']

    # Download the image from the URL
    image_response = requests.get(image_url)
    image_data = BytesIO(image_response.content)

    # Open the image with PIL and show it
    image = Image.open(image_data)
    image.show()
else:
    print('API call failed with status code:', response.status_code)
