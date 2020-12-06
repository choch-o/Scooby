import React from 'react';
import {connect} from 'react-redux'
import { } from '../Redux/actions.js'
import {Box, Button, Text, Grid, Heading, Collapsible, Image} from 'grommet'
import { PlayFill } from 'grommet-icons'
const scooby = './Scooby.png'

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
    scooby_alert() {
        alert("Dumb scooby reported! Sorry for the inconvenience. Please try other recordings.")
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

    comparePronunciation = (cp, pt) => {

        let cp_text = "";
        let pt_text = "";

        let cp_matches = new Set()
        let pt_matches = new Set()

        let i = 0;
        let j = 0;

        while (j < pt.length) {
            if (cp[i] === pt[j]) {
                cp_matches.add(i)
                pt_matches.add(j)
                // cp_text += cp[i]
                // pt_text += pt[j]
                i++;
                j++;
            } else {
                if (pt[j] === " ") {
                    while (cp[i] !== " ") {
                        // cp_text += "<span style=\"color:red;\">"+cp[i]+"</span>";
                        i++;
                    }
                    cp_matches.add(i)
                    pt_matches.add(j)
                    // cp_text += cp[i];
                    // pt_text += pt[j];
                    i++;
                    j++;
                } else if (cp[i] === " ") {
                    while (pt[j] !== " ") {
                        // pt_text += "<span style=\"color:red;\">"+pt[i]+"</span>";
                        j++;
                    }
                    cp_matches.add(i)
                    pt_matches.add(j)
                    // cp_text += cp[i];
                    // pt_text += pt[j];
                    i++;
                    j++;
                }

                else {
                    // cp_text += "<span style=\"color:red;\">"+cp[i]+"</span>";
                    // pt_text += "<span style=\"color:red;\">"+pt[j]+"</span>";
                    i++;
                    j++;
                }
            }
        }

        i = cp.length;
        j = pt.length;

        while (j >= 0) {
            if (cp[i] === pt[j]) {
                cp_matches.add(i)
                pt_matches.add(j)
                // cp_text += cp[i]
                // pt_text += pt[j]
                i--;
                j--;
            } else {
                if (pt[j] === " ") {
                    while (cp[i] !== " ") {
                        // cp_text += "<span style=\"color:red;\">"+cp[i]+"</span>";
                        i--;
                    }
                    cp_matches.add(i)
                    pt_matches.add(j)
                    // cp_text += cp[i];
                    // pt_text += pt[j];
                    i--;
                    j--;
                } else if (cp[i] === " ") {
                    while (pt[j] !== " ") {
                        // pt_text += "<span style=\"color:red;\">"+pt[i]+"</span>";
                        j--;
                    }
                    cp_matches.add(i)
                    pt_matches.add(j)
                    // cp_text += cp[i];
                    // pt_text += pt[j];
                    i--;
                    j--;
                }

                else {
                    // cp_text += "<span style=\"color:red;\">"+cp[i]+"</span>";
                    // pt_text += "<span style=\"color:red;\">"+pt[j]+"</span>";
                    i--;
                    j--;
                }
            }
        }
        
        
        for (let j = 0; j < cp.length; j++) {
            if (cp_matches.has(j)) {
                cp_text += cp[j];
            } else {
                cp_text += "<span style=\"color:red;\">"+cp[j]+"</span>";
            }
        }

        for (let j = 0; j < pt.length; j++) {
            if (pt_matches.has(j)) {
                pt_text += pt[j];
            } else {
                pt_text += "<span style=\"color:red;\">"+pt[j]+"</span>";
            }
        }

        return {"cp_text": cp_text, "pt_text": pt_text}
    }

    displayGrade = (speechace_grade) => {
        let str_ = "Grade: " + speechace_grade;
        return {"grade": str_}
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
        const syllable_count = this.props.syllable_count
        const correct_syllable_count = this.props.correct_syllable_count
        const word_count = this.props.word_count
        const correct_word_count = this.props.correct_word_count
        const ielts_estimate = this.props.ielts_estimate
        const pte_estimate = this.props.pte_estimate
        const top_border = { "color": "border", "size": "medium", "style": "dashed", "side": "bottom" }
        // const styles = StyleSheet.create({
        //     bold: {fontWeight: 'bold'},
        //     italic: {fontStyle: 'italic'},
        //     underline: {textDecorationLine: 'underline'}
        // })
        
        return (
            <Box>
                <Box fill direction="row" margin="small">
                    <Box fill="horizontal" gridArea="result_speechace" round="medium" pad="medium" margin="small" width="large"
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

                        <Box direction="row" gridArea="result_test" round="medium" pad="medium" margin="small"
                            alignSelf="center" background="light-1">
                            <Box width="200px" margin="xsmall"><Button primary label="Correct Pronunciation" icon={<PlayFill/>} onClick={() => this.playAudio(tts_result)} /></Box>
                            <Box width="200px" margin="xsmall"><Button primary label="My Pronunciation" icon={<PlayFill/>} onClick={() => this.playAudio(orig_audio)} /></Box>
                        </Box>
                        
                        <Box direction="column">
                            <Text weight="bold">If Scooby heard your speech without the script, he might understand it as...</Text>
                            {/* <Box height="small" width="small"><Image fit="cover" src={scooby}/></Box> */}
                            <Text>"{google_stt_result}"</Text>
                            <Button margin="medium"
                                primary label="So what?"
                                onClick={(e)=>this.switchCollapsible(0)}
                            />
                            <Collapsible direction='vertical' open={this.state.deepspeech_open}>
                            <Text>If you want to speak even more clearly, you might practice until Scooby will understand without the script!</Text>
                            </Collapsible>

                        </Box>
                            <Button margin="medium"
                                    primary label="Ignore this result (Dumb Scooby!)"
                                    onClick={(e)=>this.scooby_alert()}
                            />

                        </Collapsible>
                    </Box>
                    <Box gridArea="score_speechace" alignSelf="center" direction="column" width="45%">
                        <Box>
                            <Button margin="medium"
                                    primary label="What does the grade mean?"
                                    onClick={(e)=>this.switchCollapsible(3)}
                            />
                            <Collapsible direction='vertical' open={this.state.grade_meaning}>
                            <Text margin={{"horizontal": "medium"}}>
                                From your pronunciation of a sentence, word, syllable, or phoneme, the accuracy and intelligibility
                                of the overall pronunciation is measured on a scale of 0 to 100. 
                            </Text>
                            <Box margin={{"horizontal": "medium"}}>
                            <table>
                            <tr><td>A: Excellent. Native or native-like</td></tr>
                            <tr><td>B: Very good and clearly intelligible</td></tr>
                            <tr><td>C: Good. Intelligible but with one or two evident mistakes.</td></tr>
                            <tr><td>D: Fair. Possibly not intelligible with several evident mistakes.</td></tr>
                            <tr><td>F: Poor and must be reattempted.</td></tr>
                            </table> 
                            </Box>
                        </Collapsible>
                        </Box>
                        <Box>
                        <Button margin="medium"
                                primary label="Why am I getting this result?"
                                onClick={(e)=>this.switchCollapsible(4)}
                        />
                        <Collapsible direction='vertical' open={this.state.grade_reason}>
                        <Text margin={{"horizontal": "medium"}}>We count the number of correctly spoken words and syllables to grade your speech. 
                              Among {word_count} words, you pronounced {correct_word_count} words right.
                              Among {syllable_count} syllables, you pronounced {correct_syllable_count} words right.
                        </Text>
                        </Collapsible>
                        </Box>
                        <Box>
                        <Button margin="medium"
                                primary label="Get more evaluation"
                                onClick={(e)=>this.switchCollapsible(5)}
                        />
                        <Collapsible direction='vertical' open={this.state.grade_more}>
                            <Box margin={{"horizontal": "medium"}}>
                            <table>
                            <tr><td>Your estimated IELTS speaking score is: {ielts_estimate}. For more information. please visit: 
                                    <a href="https://www.ielts.com/results/scores/speaking" class="active">IELTS Score Description</a></td></tr>
                            <tr><td>Your estimated PTE speech score is: {pte_estimate}. For more information, please visit: 
                                    <a href="https://pearsonpte.com/wp-content/uploads/2020/06/Score-Guide-21.05.20-for-test-takers.pdf" class="active">PTE Score Description</a></td></tr>
                            </table> 
                        </Box>
                        </Collapsible>
                        </Box>
                    </Box>
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
    syllable_count: state.syllable_count,
    correct_syllable_count: state.correct_syllable_count,
    word_count: state.word_count,
    correct_word_count: state.correct_word_count,
    ielts_estimate: state.ielts_estimate,
    pte_estimate: state.pte_estimate
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Practice)