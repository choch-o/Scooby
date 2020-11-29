import requests
import os

class SpeechAce():
    def __init__(self, user_text="apple", user_file="apple.wav"):
        self.url = "https://api2.speechace.com/api/"
        self.key = os.environ['SPEECHACE_KEY']
        self.dialect = "en-us"
        self.user_id = "cs492f-shy"
        self.user_file = user_file
        self.user_text = user_text

    def score_pronunciation(self):
        url = self.url
        url += "scoring/text/v0.5/json" + "?" + 'key=' + self.key + '&dialect=' + self.dialect + \
               '&user_id=' + self.user_id
        payload = {'text': self.user_text, 'question_info': '\'u1/q1\''} # , 'include_fluency':'1', 'include_intonation':'1', 'stress_version':'0.8'}
        user_file_handle = open(self.user_file, 'rb')
        files = {'user_audio_file': user_file_handle}
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, files=files)

        response_json = response.json()
        print(response_json)
        word_score_list = response_json["text_score"]["word_score_list"]
        phonetic_transcription, correct_pronunciation = self.process_phone_scores(word_score_list)

        # get words that are wrong
        actual_text = self.user_text.split()
        user_transcript = phonetic_transcription.split()
        correct_transcript = correct_pronunciation.split()

        iscorrect = ""

        for i in range(len(user_transcript)):
        	if user_transcript[i] == correct_transcript[i]:
        		iscorrect += "1"
        	else:
        		iscorrect += "0"

#         return response.text
        return self.user_text, phonetic_transcription, correct_pronunciation, iscorrect

    def get_score(self):
        url = self.url
        url += "scoring/text/v0.5/json" + "?" + 'key=' + self.key + '&dialect=' + self.dialect + \
               '&user_id=' + self.user_id
        payload = {'text': self.user_text, 'question_info': '\'u1/q1\'', 'include_fluency': '1'}
        user_file_handle = open(self.user_file, 'rb')
        files = {'user_audio_file': user_file_handle}
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, files=files)
        response_json = response.json()
        score = response_json["text_score"]["quality_score"]
        grade = "default"
        if score >= 90:
            grade = "A"
        elif score >= 80 and score < 90:
            grade = "B"
        elif score >= 70 and score < 80:
            grade = "C"
        elif score >= 60 and score < 70:
            grade = "D"
        else:
            grade = "F"

        fluency = response_json["text_score"]["fluency"]["overall_metrics"]
        syllable_count = fluency["syllable_count"]
        correct_syllable_count = fluency["correct_syllable_count"]
        word_count = fluency["word_count"]
        correct_word_count = fluency["correct_word_count"]
        ielts_estimate = fluency["ielts_estimate"]
        pte_estimate = fluency["pte_estimate"]

        return grade, syllable_count, correct_syllable_count, word_count, correct_word_count, ielts_estimate, pte_estimate


    def validate_text(self):
        '''
        validate whether all the words in the text
        exist in the SpeechAce lexicon
        '''
        # curl --location --request POST
        # 'https://api.speechace.co/api/validating/text/v0.5/json?key={{speechacekey}}&text=%22Validate%20these%20words%20existeee.%22&dialect=en-us'
        url = self.url
        url += "validating/text/v0.5/json" + "?" + 'key=' + self.key + '&dialect=' + self.dialect + \
               '&text=\"' + self.user_text + '\"' 
        payload = {}
        files = {}
        headers = {}

        response = request.request("POST", url, headers=headers, data=payload, files=files)
        return response

    def transcribe(self):
        # https://api.speechace.co/api/scoring/speech/v0.5/json?key={{speechacekey}}&dialect=en-us&user_id=XYZ-ABC-99001
        url = self.url
        url += "scoring/speech/v0.5/json?key=" + self.key + "&dialect=en-us" + self.dialect + \
                "&user_id=" + self.user_id
        payload = {'include_fluency': '1'}
        files = [
          ('user_audio_file', open(self.user_file,'rb'))
        ]
        headers= {}

        response = requests.request("POST", url, headers=headers, data = payload, files = files)

        print("Transcribe response")
        response_text = response.text.encode('utf8')
        print(response_text)
        return response_text

    def score_phoneme_list(self):
        # https://api.speechace.co/api/scoring/phone_list/v0.5/json?key={{speechacekey}}&user_id=XYZ-ABC-99001&dialect=en-us
        url = self.url
        url += "scoring/phone_list/v0.5/json?key=" + self.key + "&user_id=" + self.user_id + "&dialect=en-us"
        payload = {'phone_list': 'g|ao|ch|ah',
        'question_info': '\'u1/q1\''}
        files = [
          ('user_audio_file', open(self.user_file,'rb'))
        ]
        headers= {}

        response = requests.request("POST", url, headers=headers, data = payload, files = files)

        response_text = response.text.encode('utf8')
        response_json = response.json()
        print(response_json)
        phone_score_list = response_json["word_score"]["phone_score_list"]
        phonetic_transcription = self.process_phone_scores(phone_score_list)

        return phonetic_transcription

    def process_phone_scores(self, word_score_list):
        correct_pronunciation = ""
        phonetic_transcription = ""
        for word in word_score_list:
            phone_score_list = word["phone_score_list"]
            for phone_score in phone_score_list:
                correct_pronunciation += phone_score["phone"] if phone_score["phone"] != None else ""
                phonetic_transcription += phone_score["sound_most_like"] if phone_score["sound_most_like"] != None else ""
            correct_pronunciation += " "
            phonetic_transcription += " "
        return phonetic_transcription, correct_pronunciation

