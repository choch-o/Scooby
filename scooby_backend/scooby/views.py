from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from .models import Post
from .serializers import PostSerializer
from STT_models.stt_engine import MozillaSTT
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
        file_obj = request.FILES['file']
        stt_result, speechace_result = handle_uploaded_file(file_obj)
        print("Put response :" + stt_result)
        return Response(data={"stt_result": stt_result, "speechace_result": speechace_result}, status=status.HTTP_201_CREATED)

def handle_uploaded_file(raw_audio):
    # f is Cloass UploadedFile
    # https://docs.djangoproject.com/en/3.1/ref/files/uploads/#django.core.files.uploadedfile.UploadedFile
    # TODO: Transcribe
    # Make this function in a separate file if needed

    with open('myfile.wav', mode='bw') as f:
        f.write(raw_audio.read())
    stt_result = MozillaSTT('myfile.wav')# temporary
    speechace_result = SpeechAce('myfile.wav').example()
    return stt_result, speechace_result
