# Scooby
--------------
# Code Structure
Important files are highlighted with ** ** . (Not all files are listed)
```
Scooby/
- scooby_backend/
-- .env
-- scooby/                  - Django models, urls, views
--- **views.py**
-- scooby_backend/          - Routing and db settings
-- SpeechAce/           
--- **speechace.py**        - Functions for using SpeechAce API
-- STT_models/
--- **stt_engine.py**       - Functions for using Google Speech API

- scooby_frontend/
-- .env
-- src/
--- Containers/             - Main UI components
---- **Scooby.js**          - Main file
---- **UploadAudioFile.js** - Component for uploading the script and audio file and run
---- **Practice.js**        - Component for showing the explanations and results
--- Redux/                  - Main Redux components for data management and communication with backend
---- **actions.js**         - Communication with backend
---- **reducers.js**        - Dispatch to Redux
--- index.js
--- App.js
```

# How to Set up
1. Clone the repository.
```
git clone https://github.com/choch-o/Scooby.git
```
2. Make a virtual environment.
3. Create `db` directory under the root directory `Scooby` and set permissions
```
# In Scooby
virtualenv venv --python=python3.8
source venv/bin/activate
mkdir db
sudo chmod a+w db
```
##### Note
The __*backend_env*__ and __*frontend_env*__ will be provided privately if needed.

Copy .env files.
```
cp backend_env scooby_backend/.env
cp frontend_env scooby_frontend/.env
```
## Backend
Go to `Scooby/scooby_backend` and install Python packages.
```
cd scooby_backend
pip install -r requirements.txt
```

In `Scooby/scooby_backend`, perform migrations
```
python manage.py makemigrations
python manage.py migrate
```

<!-- Setup DeepSpeech in `Scooby/scooby_backend/STT_models`.
```
cd STT_models
sh download.sh
``` -->
Setup GoogleCredentials to use Google APIs.
```
Run this command in your terminal
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
e.g. export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
The json credentials files will be provided privately if needed.
```

Run the server in `Scooby/scooby_backend`.
```
python manage.py runserver 0.0.0.0:8000
```
Check that your server is running in browser `localhost:8000`.
Test if writing to database works well by posting something in `localhost:8000/api/posts`.

## Frontend
Go to `Scooby/scooby_frontends` and install npm/yarn packages.
```
cd scooby_frontend
yarn install
```
Run the development server.
```
yarn start
```

Check that your frontend code is running in browser `localhost:3000`.
Test if the sample post you wrote in the Backend step appears on the page.
