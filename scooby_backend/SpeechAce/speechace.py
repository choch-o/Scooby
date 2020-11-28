import requests
import os

class SpeechAce():
    def __init__(self, user_file):
        self.url = "https://api2.speechace.com/api/scoring/text/v0.5/json"
        self.key = os.environ['SPEECHACE_KEY']
        self.dialect = "en-us"
        self.user_id = "elianakim"
        self.user_file = user_file
    def example(self):
        url = self.url
        url += "?" + 'key=' + self.key + '&dialect=' + self.dialect + '&user_id=' + self.user_id
        print(url)
        payload = {'text': 'apple', 'question_info' : 'u1/q1'};
        user_file_handle = open(self.user_file, 'rb')
        print(user_file_handle)
        files = {'user_audio_file': user_file_handle}
        response = requests.post(url, data=payload, files=files)
        print(response)
        print(response.text)
        return response.text