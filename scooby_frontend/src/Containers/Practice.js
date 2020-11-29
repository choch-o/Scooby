import React from 'react';
import {connect} from 'react-redux'
import { } from '../Redux/actions.js'
import {Box, Button, Text, Grid, Heading, Collapsible} from 'grommet'

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
        if (button_id == 0) { // deepspeech
    		this.setState({ deepspeech_open: this.state.deepspeech_open ? false : true });
        } else if (button_id == 1) { // speechace
            this.setState({ speechace_open: this.state.speechace_open ? false : true });
        } else if (button_id == 2) { // google
            this.setState({ google_open: this.state.google_open ? false : true });
        } else if (button_id == 3) { // grade meaning
            this.setState({ grade_meaning: this.state.grade_meaning ? false : true });
        } else if (button_id == 4) { // why am I getting this result
            this.setState({ grade_reason: this.state.grade_reason ? false : true });
        } else if (button_id == 5) { // more grades
            this.setState({ grade_more: this.state.grade_more ? false : true });
        }
	}
    comparePronunciation = (cp, pt) => {

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
        const correct_pronunciation = this.props.correct_pronunciation
        const phonetic_transcription = this.props.phonetic_transcription
        const google_result = this.props.google_result
        const tts_result = this.props.tts_result
        const orig_audio = this.props.orig_audio
        const top_border = { "color": "border", "size": "medium", "style": "dashed", "side": "bottom" }
        // const styles = StyleSheet.create({
        //     bold: {fontWeight: 'bold'},
        //     italic: {fontStyle: 'italic'},
        //     underline: {textDecorationLine: 'underline'}
        // })
        
        return (
            <Grid
                fill
                rows={['xsmall', 0, 'flex', 0, 'flex']}
                columns={['small','flex','flex']}
                gap="small"
                pad="medium"
                areas={[
                    { name: 'column_name', start: [0, 0], end: [0, 0]},
                    { name: 'column_results', start: [1, 0], end: [1, 0]},
                    { name: 'column_scores', start: [2, 0], end: [2, 0]},
                    { name: 'name_deepspeech', start: [0, 1], end: [0, 1]},
                    { name: 'name_speechace', start: [0, 2], end: [0, 2]},
                    { name: 'name_google', start: [0, 3], end: [0, 3]},
                    { name: 'name_test', start: [0, 4], end: [0, 4]},
                    { name: 'result_deepspeech', start: [1, 1], end: [1, 1]},
                    { name: 'result_speechace', start: [1, 2], end: [1, 2]},
                    { name: 'result_google', start: [1, 3], end: [1, 3]},
                    { name: 'result_test', start: [1, 4], end: [1, 4]},
                    { name: 'score_deepspeech', start: [2, 1], end: [2, 1]},
                    { name: 'score_speechace', start: [2, 2], end: [2, 2]},
                    { name: 'score_google', start: [2, 3], end: [2, 3]},
                    { name: 'score_test', start:[2, 4], end: [2, 4]}
                ]}
            >
                <Box gridArea="column_name" alignSelf="center" border={top_border} margin="small">
                    <Heading level="4" margin="medium" alignSelf="center">Index</Heading>
                </Box>
                <Box gridArea="column_results" alignSelf="center" border={top_border} margin="small">
                    <Heading level="4" margin="medium" alignSelf="center">Results</Heading>
                </Box>
                <Box gridArea="column_scores" alignSelf="center" border={top_border} margin="small">
                    <Heading level="4" margin="medium" alignSelf="center">Scores</Heading>
                </Box>

                {/*DeepSpeech*/}
                {/* <Box gridArea="name_deepspeech" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">DeepSpeech</Heading>
                </Box>
                <Box gridArea="result_deepspeech" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <Text>{stt_result}</Text>
                    <Button margin="medium"
                            primary label="Why this result?"
                            onClick={(e)=>this.switchCollapsible(0)}
                    />
                    <Collapsible
                        direction='vertical'
                        open={this.state.deepspeech_open}
                    >
					Explanations
                    </Collapsible>
                </Box>
                <Box gridArea="score_deepspeech" alignSelf="center">
                    <Heading level="3" alignSelf="center">A</Heading>
                </Box> */}

                {/*SpeechAce*/}
                <Box gridArea="name_speechace" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">Scooby</Heading>
                </Box>
                <Box gridArea="result_speechace" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">

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
                    <Heading level="3" alignSelf="center">A</Heading>
                    <Button margin="medium"
                            primary label="What does the grade mean?"
                            onClick={(e)=>this.switchCollapsible(3)}
                    />
                    <Collapsible direction='vertical' open={this.state.speechace_open}>
					Explanations
                    </Collapsible>
                    <Button margin="medium"
                            primary label="Why am I getting this result?"
                            onClick={(e)=>this.switchCollapsible(4)}
                    />
                    <Collapsible direction='vertical' open={this.state.speechace_open}>
					Explanations
                    </Collapsible>
                    <Button margin="medium"
                            primary label="Get more evaluation"
                            onClick={(e)=>this.switchCollapsible(5)}
                    />
                    <Collapsible direction='vertical' open={this.state.speechace_open}>
					Explanations
                    </Collapsible>
                </Box>
                {/*Google*/}
                {/* <Box gridArea="name_google" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">Google</Heading>
                </Box>
                <Box gridArea="result_google" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <Text>{google_result}</Text>
                    <Button margin="medium"
                            primary label="Why this result?"
                            onClick={(e)=>this.switchCollapsible(2)}
                    />
                    <Collapsible
                        direction='vertical'
                        open={this.state.google_open}
                    >
					Explanations
                    </Collapsible>
                </Box>
                <Box gridArea="score_google" alignSelf="center">
                    <Heading level="3" alignSelf="center">A</Heading>
                </Box> */}

                {/*test*/}
                {/*Google*/}
                <Box gridArea="name_test" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">Your Recordings</Heading>
                </Box>
                <Box gridArea="result_test" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <Button onClick={() => this.playAudio(tts_result)}>Play</Button>
                    <Button onClick={() => this.playAudio(orig_audio)}>Play mine</Button>
                </Box>
                <Box gridArea="score_test" alignSelf="center">
                    <Heading level="3" alignSelf="center">A</Heading>
                </Box>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    stt_result: state.stt_result,
    speechace_score: state.speechace_score,
    correct_pronunciation: state.correct_pronunciation,
    phonetic_transcription: state.phonetic_transcription,
    google_result: state.google_result,
    tts_result: state.tts_result,
    orig_audio: state.orig_audio,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Practice)