#Scooby
## Milestone 2: Prototype
<span style="color:blue">*SHY*</span> team: <span style="color:blue">*S*</span>hyngys Aitkazinov | <span style="color:blue">*H*</span>yunsung Cho | <span style="color:blue">*Y*</span>ewon Kim

### Project summary
Despite the variety of existing AI pronunciation practicing models, there is no AI-interactive platform for non-native English speakers to evaluate and practice English pronunciation skills with __personalized scripts__ . To solve this problem, we propose Scooby, a AI powered platform where users input their scripts, practice the pronunciation and receive the feedback from AI to further improve the English speech skills. Unique features of Scooby include ii) enabling a user's __personal text input__, ii) visualizing the speech-to-text results with __wrongly spoken parts colored__, iii) providing sophisticated __phonetic-level analysis__ from AI, iv) __scoring the user speeches__.
<!-- , and v) giving users an option to ignore the model. -->

### Instruction
The instructions to set up the project are clearly explained in the README file in our Git repository (we also included README in the submitted zip file).

Our platform usage instructions:

1. This is how the web interface look like: 

![First screen](Scooby_3.JPG "Title")

2. First step is to type the script in the corresponding box, and then the user should upload his audio for the given script for evaluation. Click `Practice` button. (It takes around 10 seconds to process)
Note, it required to use plain-text for the script and it highly recommended to avoid use special characters such as '_', it might worsen the performance of the platform. The support audio formats are mp3, m4a, wav
Example:
![Uploading](Scooby_4.JPG "Title")

3. Next step is to observe your grade and observe the mistakes the user made, user can ask for the detailed explanation (phoneme-level analysis) by clicking on the button `Why this result?`. The explanation will be done by coloring the parts of the phonemes that the user mispronuonced with red color. Moreover, in order to understand user's mistakes the user might want hear his own and the correct pronounciation synthesized by AI, which could be done by clicking the `Correct Pronounciation` and `My Pronounciation`. Last feature at this point is that the platform shows the text output by the AI how it understood the user's text if there was no script.  
!["Why this result"](Scooby_5.JPG "Title")

4. By clicking `What does the grade mean?`, the user can  know what does particular grade mean.
!["Grade"](Scooby_6.JPG "Title")

5. `Why am I getting this result?` button will provide sophisticated statistics and analysis of the user's speech, so that the user can understand overall pronouncation performance level on the inputted script.
![](Scooby_6.JPG "Title")

6. Using `Get more evaluation` button, the user can know his/her own estimated IELTS and PET score descriptions t help users to understand their level of their pronounciation skills. If the user does not know this evaluation metrics, the corresponding links with description are provided.
![](Scooby_6.JPG "Title")


<!-- 

1. Initial Scooby settings
```
git clone https://github.com/choch-o/Scooby.git
cd Scooby/
# In Scooby directory
virtualenv venv --python=python3.8
source venv/bin/activate
mkdir db
sudo chmod a+w db
cp backend_env scooby_backend/.env
cp frontend_env scooby_frontend/.env
```
This is the screenshot for these steps:
![First steps](Scooby_2.JPG "Title")


##### Note
__*backend_env*__ and __*frontend_env*__  will be provided separately because they include the keys to the services we used in development of the prototype

2. Backend settings

```
cd scooby_backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
export GOOGLE_APPLICATION_CREDENTIALS="path/to/the/credentials.json"

```
##### Note
__*credentials.json*__ will be provided separately because it includes private keys to the google services of our team's member

The screenshot:

![Backend steps](Scooby_3.JPG "Title")


Run the server in `Scooby/scooby_backend`.
```
python manage.py runserver 0.0.0.0:8000
```

Your server will be running in browser `localhost:8000`.
Test if writing to database works well by posting something in `localhost:8000/api/posts`.

The screenshot:

![Backend steps](Scooby_4.JPG "Title")


3. Frontend settings

```
cd scooby_backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
export GOOGLE_APPLICATION_CREDENTIALS="path/to/the/credentials.json"
python manage.py runserver 0.0.0.0:8000

```
##### Note
__*credentials.json*__ will be provided separately because it includes private keys to the google services of our team's member

The outcome of these steps should look like this:

![Frontend steps](Scooby_3.JPG "Title")

Install npm/yarn packages if you don't have them on your machine. On linux machine it could be done by these commands:
```
sudo apt-get update
sudo apt-get install yarn
```

Then run these commands:

```
yarn install
yarn start
```

The screenshot:

![frontend steps](Scooby_5.JPG "Title")

4. Check that your frontend code is running in browser `localhost:3000`.
Test if the sample post you wrote in the Backend step appears on the page.

Screenshot: "" -->


### URL of your prototype
http://chris.kaist.ac.kr:5432/

### URL of your Git repository
https://github.com/choch-o/Scooby/


### Libraries and frameworks
For the backend and AI parts we used following libraries and frameworks:
- Django framework
- SpeechAce API (https://docs.speechace.com/ )
- Google Cloud STT and TTS engines:
    - google-api-python-client
    - google-cloud-speech
    - google-cloud-texttospeech
- Audio processing libraries:
    - SoundFile
    - pydub
    - simpleaudio

For the frontend we used:
- ReactJS

### Individual Reflections

#### Shyngys Aitkazinov
I have contributed mostly to the AI part, I tested different STT and TTS engines such as Mozilla Deepspeech, Google STT, Google TTS models. I integrated some of them to our platform. I also contributed by processing the raw input files to different formats.

I faced difficulties in accessing the APIs from the abovementioned sources. Obtaining credentials was painful for me because of the information validation. Most probably, this is because I am foreigner.

I learned how to work with audio files, convert to different formats, so that the APIs would accept them.

#### Hyungsung Cho

#### Yewon Kim




