import Types from "./types";
const initialState = {
    posts: [],
    loading:false,
    stt_result: "",
    user_text: "",
    is_correct: "",
    phonetic_transcription: "",
    correct_pronunciation: "",
    google_result: "",
    tts_result: "",
    orig_audio: "",
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.POSTS_LOADING: {
            console.log("create_item");
            return {...state,loading: action.payload};
        }

        case Types.GET_POSTS: {
            return {...state,posts: action.payload};
        }

        case Types.DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id != action.payload)}
        }

        case Types.UPLOAD_FILE: {
            return {...state, 
                speechace_score: action.payload.speechace_score,
                stt_result: action.payload.stt_result,
                correct_pronunciation: action.payload.correct_pronunciation,
                phonetic_transcription: action.payload.phonetic_transcription,
                user_text: action.payload.user_text,
                is_correct: action.payload.is_correct,
                tts_result: action.payload.tts_result,
                orig_audio: action.payload.orig_audio,
                google_stt_result: action.payload.google_stt_result,
            };
        }
        default:
            return state;
    }
}

export default postReducer;