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
        stt_result, phonetic_transcription, correct_pronunciation = handle_uploaded_file(file_obj, script)
        # print("Put response :" + stt_result)
        return Response(data={"stt_result": stt_result, "phonetic_transcription": phonetic_transcription, \
        "correct_pronunciation": correct_pronunciation}, status=status.HTTP_201_CREATED)

def handle_uploaded_file(raw_audio, script):
    # f is Cloass UploadedFile
    # https://docs.djangoproject.com/en/3.1/ref/files/uploads/#django.core.files.uploadedfile.UploadedFile
    # TODO: Transcribe
    # Make this function in a separate file if needed

    with open('myfile.wav', mode='bw') as f:
        f.write(raw_audio.read())
    # stt_result = stt.MozillaSTT('myfile.wav')
    tts_path = stt.google_tts(script)
    response, res = stt.google_transcribe('myfile.wav')
    # print(response)
    # print(res)
    # stt.play_audio_pydub(tts_path)
    # stt.play_audio_pydub('myfile.wav')
    stt_result = stt.simple_word_scorer(stt.script_converter(script), response) 
    phonetic_transcription, correct_pronunciation = SpeechAce(user_text=script, user_file='myfile.wav').score_pronunciation()
#     speechace_result = SpeechAce(user_text=script, user_file='myfile.wav').score_phoneme_list()
    return stt_result[0], phonetic_transcription, correct_pronunciation
