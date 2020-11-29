from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from .models import Post
from .serializers import PostSerializer
import STT_models.stt_engine as stt
from SpeechAce.speechace import SpeechAce
import os
import scipy.io.wavfile
import base64

# Create Views here
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def put(self, request, format=None):
        print("REQUEST FILES: ")
        print(request.data)
        file_obj = request.data['file']
        script = request.data['script']
        stt_result, phonetic_transcription, correct_pronunciation, speechace_score, tts_result, orig_audio, google_stt_result \
         = handle_uploaded_file(file_obj, script)
        # print("Put response :" + stt_result)
        return Response(data={"stt_result": stt_result, 
        "phonetic_transcription": phonetic_transcription, \
        "correct_pronunciation": correct_pronunciation, \
        "tts_result": base64.b64encode(tts_result), \
        "orig_audio": base64.b64encode(orig_audio), \
        "google_stt_result": google_stt_result,
        }, status=status.HTTP_201_CREATED)

def handle_uploaded_file(raw_audio, script):
    # f is Cloass UploadedFile
    # https://docs.djangoproject.com/en/3.1/ref/files/uploads/#django.core.files.uploadedfile.UploadedFile
    # TODO: Transcribe
    # Make this function in a separate file if needed

    with open('myfile.wav', mode='bw') as f:
        orig_audio = raw_audio.read()
        f.write(orig_audio)
    # stt_result = stt.MozillaSTT('myfile.wav')
    tts_path, response_audio = stt.google_tts(script)
    response = stt.google_transcribe('myfile.wav')
    google_stt_result = response
    # stt.play_audio_pydub(tts_path)
    # stt.play_audio_pydub('myfile.wav')

    stt_result = stt.simple_word_scorer(stt.script_converter(script), response) 
    user_text, phonetic_transcription, correct_pronunciation, is_correct = SpeechAce(user_text=script, user_file='myfile.wav').score_pronunciation()
    speechace_score = SpeechAce(user_text=script, user_file='myfile.wav').get_score()
    return stt_result[0], user_text, phonetic_transcription, correct_pronunciation, is_correct, speechace_score, response_audio, orig_audio, google_stt_result