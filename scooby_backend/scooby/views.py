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
        stt_result, user_text, phonetic_transcription, correct_pronunciation, is_correct, speechace_score, tts_result, orig_audio, google_stt_result, syllable_count, correct_syllable_count, word_count, correct_word_count, ielts_estimate, pte_estimate \
         = handle_uploaded_file(file_obj, script)
        # print("Put response :" + stt_result)
        return Response(data={"stt_result": stt_result, 
        "user_text": user_text, \
        "speechace_score": speechace_score, \
        "phonetic_transcription": phonetic_transcription, \
        "correct_pronunciation": correct_pronunciation, \
        "is_correct": is_correct, \
        "tts_result": base64.b64encode(tts_result), \
        "orig_audio": base64.b64encode(orig_audio), \
        "google_stt_result": google_stt_result, \
        "syllable_count": syllable_count, \
        "correct_syllable_count": correct_syllable_count, \
        "word_count": word_count, \
        "correct_word_count": correct_word_count, \
        "ielts_estimate": ielts_estimate, \
        "pte_estimate": pte_estimate,
        }, status=status.HTTP_201_CREATED)

def handle_uploaded_file(raw_audio, script):
    # f is Cloass UploadedFile
    # https://docs.djangoproject.com/en/3.1/ref/files/uploads/#django.core.files.uploadedfile.UploadedFile
    # TODO: Transcribe
    # Make this function in a separate file if needed
    audio_string = (str(raw_audio))
    
    # print(raw_audio.read())
    
    with open(audio_string, mode='bw') as f:
        orig_audio = raw_audio.read()
        f.write(orig_audio)
    new_audio_path = stt.mp3m4a_to_wav(audio_string)
    # stt_result = stt.MozillaSTT('myfile.wav')
    tts_path, response_audio = stt.google_tts(script, audio_string)
    response, google_stt_result = stt.google_transcribe(new_audio_path)
    # print (response, google_stt_result)
    # stt.play_audio_pydub(tts_path)
    # stt.play_audio_pydub('myfile.wav')

    # stt_result = stt.simple_word_scorer(stt.script_converter(script), response) 

    speechace = SpeechAce(user_text=script, user_file=new_audio_path)
    user_text, phonetic_transcription, correct_pronunciation, is_correct = speechace.score_pronunciation()
    speechace_score, syllable_count, correct_syllable_count, word_count, correct_word_count, ielts_estimate, pte_estimate = speechace.get_score()
    return "unused_text", user_text, phonetic_transcription, correct_pronunciation, is_correct, speechace_score, response_audio, orig_audio, google_stt_result, syllable_count, correct_syllable_count, word_count, correct_word_count, ielts_estimate, pte_estimate