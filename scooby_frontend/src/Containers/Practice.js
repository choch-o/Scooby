import React from 'react';
import {connect} from 'react-redux'
import { } from '../Redux/actions.js'
import {Box, Button, Text, Grid, Heading, Collapsible} from 'grommet'
import { PlayFill } from 'grommet-icons'

class Practice extends React.Component {
    state = {
        deepspeech_open: false,
        speechace_open: false,
        google_open: false,
        grade_meaning: false,
        grade_reason: false,
        grade_more: false
    }
    switchCollapsible = (button_id) => {
        if (button_id === 0) { // deepspeech
    		this.setState({ deepspeech_open: this.state.deepspeech_open ? false : true });
        } else if (button_id === 1) { // speechace
            this.setState({ speechace_open: this.state.speechace_open ? false : true });
        } else if (button_id === 2) { // google
            this.setState({ google_open: this.state.google_open ? false : true });
        } else if (button_id === 3) { // grade meaning
            this.setState({ grade_meaning: this.state.grade_meaning ? false : true });
        } else if (button_id === 4) { // why am I getting this result
            this.setState({ grade_reason: this.state.grade_reason ? false : true });
        } else if (button_id === 5) { // more grades
            this.setState({ grade_more: this.state.grade_more ? false : true });
        }
    }
    colorText = (user_text, is_correct) => {
        // user_text When practicing the pronunciation, we should also let users effectively do it through interactions with AI.
        // is_correct "1010111110111011"
        console.log(user_text);
        console.log(is_correct);
        // "<span style=\"color:red;\">"+cp[i]+"</span>";
        let ret_str = "";
        let word_buf = "";
        let word_index = 0;
        let i = 0;

        while (i < user_text.length) {
            if (user_text[i] !== " ") {
                word_buf += user_text[i];
            } else { // if space
                ret_str += " ";
                if (is_correct[word_index] === "0") { // if wrong set the color red
                    ret_str += "<span style=\"color:red;\">" + word_buf + "</span>";
                } else { // if right color black
                    ret_str += word_buf;
                }
                word_buf = "";
                word_index++;
            }
            i++;
        }
        // put the last word
        ret_str += " ";
        if (is_correct[word_index] === "0") { // if wrong set the color red
            ret_str += "<span style=\"color:red;\">" + word_buf + "</span>";
        } else { // if right color black
            ret_str += word_buf;
        }
        return {"colored_sentence" : ret_str}
    }

    findSubstrings = (cp, pt) => {
        let answer = ""
        let anslist = []
        for (let i = 0; i < cp.length; i++) {
            let match = ""
            for (let j = 0; j < pt.length; j++) {
                if ((i + j < cp.length) && cp[i + j] == pt[j]) {
                    match += pt[j]
                } else { // if (match.length > answer.length)
                    answer = match
                    if ((answer !== '') && (answer.length > 1)) {
                        anslist.push(answer)
                    }
                    match = ""
                }
            }
            if (match !== "") {
                anslist.push(match)
            }
        }

        console.log("Substrings: ")
        console.log(anslist)
    }

    comparePronunciation = (cp, pt) => {

        this.findSubstrings(cp, pt)
        // cp = "hhaw mahch taym duw yuw spehnd aan riydihng ah peyper";/*
        // pt = "hhaw mahs taym hhuw ihih spehn aan riydihng ah perper";*/

        let cp_text = "";
        let pt_text = "";

        let i = 0;
        let j = 0;

        while (j < pt.length) {
            if (cp[i] === pt[j]) {
                cp_text += cp[i]
                pt_text += pt[j]
                i++;
                j++;
            } else {
                if (pt[j] === " ") {
                    while (cp[i] !== " ") {
                        cp_text += "<span style=\"color:red;\">"+cp[i]+"</span>";
                        i++;
                    }
                    cp_text += cp[i];
                    pt_text += pt[j];
                    i++;
                    j++;
                } else if (cp[i] === " ") {
                    while (pt[j] !== " ") {
                        pt_text += "<span style=\"color:red;\">"+pt[i]+"</span>";
                        j++;
                    }
                    cp_text += cp[i];
                    pt_text += pt[j];
                    i++;
                    j++;
                }

                else {
                    cp_text += "<span style=\"color:red;\">"+cp[i]+"</span>";
                    pt_text += "<span style=\"color:red;\">"+pt[j]+"</span>";
                    i++;
                    j++;
                }
            }
        }

        return {"cp_text": cp_text, "pt_text": pt_text}
    }

    playAudio = (tts_result) => {
        var snd = new Audio("data:audio/wav;base64," + tts_result);
        snd.play();
    }

    render() {
        const stt_result = this.props.stt_result
        const speechace_score = this.props.speechace_score
        const user_text = this.props.user_text
        const is_correct = this.props.is_correct
        const correct_pronunciation = this.props.correct_pronunciation
        const phonetic_transcription = this.props.phonetic_transcription
        const google_result = this.props.google_result
        const tts_result = this.props.tts_result
        const orig_audio = this.props.orig_audio
        const google_stt_result = this.props.google_stt_result
        const top_border = { "color": "border", "size": "medium", "style": "dashed", "side": "bottom" }
        // const styles = StyleSheet.create({
        //     bold: {fontWeight: 'bold'},
        //     italic: {fontStyle: 'italic'},
        //     underline: {textDecorationLine: 'underline'}
        // })
        
        return (
            <Box>
                <Box fill direction="row">
                    <Box fill="horizontal" gridArea="result_speechace" round="medium" pad="medium" margin="small"
                        alignSelf="center" background="light-1">
                        <Text weight="bold">Grade: {speechace_score}</Text>
                        <div
                            dangerouslySetInnerHTML={{__html: this.colorText(user_text, is_correct).colored_sentence}} />
                        <Button margin="medium"
                                primary label="Why this result?"
                                onClick={(e)=>this.switchCollapsible(1)}
                        />
                        <Collapsible direction='vertical' open={this.state.speechace_open}>
                        <table>
                            <tr><td><Text weight="bold">Correct: </Text></td><td><div
                                dangerouslySetInnerHTML={{__html: this.comparePronunciation(correct_pronunciation, phonetic_transcription).cp_text }} /></td></tr>
                            <tr><td><Text weight="bold">Yours: </Text></td><td><div
                                dangerouslySetInnerHTML={{__html: this.comparePronunciation(correct_pronunciation, phonetic_transcription).pt_text }} /></td></tr>
                        </table>
                        </Collapsible>
                    </Box>
                    <Box gridArea="score_speechace" alignSelf="center">
                        <Heading level="3" alignSelf="center">{speechace_score}</Heading>
                        <Button margin="medium"
                                primary label="What does the grade mean?"
                                onClick={(e)=>this.switchCollapsible(3)}
                        />
                        <Collapsible direction='vertical' open={this.state.grade_meaning_open}>
                        <Text>
                            We measure the accuracy and intelligibility of the pronunciation of a sentence, word, syllable, a
                        </Text>
                        </Collapsible>
                        <Button margin="medium"
                                primary label="Why am I getting this result?"
                                onClick={(e)=>this.switchCollapsible(4)}
                        />
                        <Collapsible direction='vertical' open={this.state.grade_reason_open}>
                        Explanations
                        </Collapsible>
                        <Button margin="medium"
                                primary label="Get more evaluation"
                                onClick={(e)=>this.switchCollapsible(5)}
                        />
                        <Collapsible direction='vertical' open={this.state.grade_more_open}>
                        Explanations
                        </Collapsible>
                    </Box>
                </Box>
                <Box gridArea="result_test" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <Button fill="false" primary label="Correct Pronunciation" icon={<PlayFill/>} onClick={() => this.playAudio(tts_result)} />
                    <Button fill="false" primary label="My Pronunciation" icon={<PlayFill/>} onClick={() => this.playAudio(orig_audio)} />
                    <Text>{google_stt_result}</Text>
                </Box>
                <Box gridArea="score_test" alignSelf="center">
                    <Heading level="3" alignSelf="center">{speechace_score}</Heading>
                </Box>
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    stt_result: state.stt_result,
    speechace_score: state.speechace_score,
    correct_pronunciation: state.correct_pronunciation,
    phonetic_transcription: state.phonetic_transcription,
    user_text: state.user_text,
    is_correct: state.is_correct,
    google_result: state.google_result,
    tts_result: state.tts_result,
    orig_audio: state.orig_audio,
    google_stt_result: state.google_stt_result,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Practice)