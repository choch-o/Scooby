import React from 'react';
import {connect} from 'react-redux'
import { } from '../Redux/actions.js'
import {Box, Text, Grid, Heading} from 'grommet'

class Practice extends React.Component {
    render() {
        const stt_result = this.props.stt_result
        const correct_pronunciation = this.props.correct_pronunciation
        const phonetic_transcription = this.props.phonetic_transcription
        const google_result = this.props.google_result
        const top_border = { "color": "border", "size": "medium", "style": "dashed", "side": "bottom" }

        return (
            <Grid
                fill
                rows={['xsmall', 'flex', 'flex', 'flex']}
                columns={['small','flex','xsmall']}
                gap="small"
                pad="medium"
                areas={[
                    { name: 'column_name', start: [0, 0], end: [0, 0]},
                    { name: 'column_results', start: [1, 0], end: [1, 0]},
                    { name: 'column_scores', start: [2, 0], end: [2, 0]},
                    { name: 'name_deepspeech', start: [0, 1], end: [0, 1]},
                    { name: 'name_speechace', start: [0, 2], end: [0, 2]},
                    { name: 'name_google', start: [0, 3], end: [0, 3]},
                    { name: 'result_deepspeech', start: [1, 1], end: [1, 1]},
                    { name: 'result_speechace', start: [1, 2], end: [1, 2]},
                    { name: 'result_google', start: [1, 3], end: [1, 3]},
                    { name: 'score_deepspeech', start: [2, 1], end: [2, 1]},
                    { name: 'score_speechace', start: [2, 2], end: [2, 2]},
                    { name: 'score_google', start: [2, 3], end: [2, 3]},
                ]}
            >
                <Box gridArea="column_name" alignSelf="center" border={top_border} margin="small">
                    <Heading level="4" margin="medium" alignSelf="center">Name</Heading>
                </Box>
                <Box gridArea="column_results" alignSelf="center" border={top_border} margin="small">
                    <Heading level="4" margin="medium" alignSelf="center">Results</Heading>
                </Box>
                <Box gridArea="column_scores" alignSelf="center" border={top_border} margin="small">
                    <Heading level="4" margin="medium" alignSelf="center">Scores</Heading>
                </Box>

                {/*DeepSpeech*/}
                <Box gridArea="name_deepspeech" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">DeepSpeech</Heading>
                </Box>
                <Box gridArea="result_deepspeech" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <Text>{stt_result}</Text>
                </Box>
                <Box gridArea="score_deepspeech" alignSelf="center">
                    <Heading level="3" alignSelf="center">A</Heading>
                </Box>

                {/*SpeechAce*/}
                <Box gridArea="name_speechace" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">SpeechAce</Heading>
                </Box>
                <Box gridArea="result_speechace" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <table>
                        <tr><td><Text weight="bold">Correct: </Text></td><td>{correct_pronunciation}</td></tr>
                        <tr><td><Text weight="bold">Yours: </Text></td><td>{phonetic_transcription}</td></tr>
                    </table>
                </Box>
                <Box gridArea="score_speechace" alignSelf="center">
                    <Heading level="3" alignSelf="center">A</Heading>
                </Box>

                {/*Google*/}
                <Box gridArea="name_google" alignSelf="center">
                    <Heading level="3" margin="medium" alignSelf="center">Google</Heading>
                </Box>
                <Box gridArea="result_google" round="medium" pad="medium" margin="small"
                     alignSelf="center" background="light-1">
                    <Text>{google_result}</Text>
                </Box>
                <Box gridArea="score_google" alignSelf="center">
                    <Heading level="3" alignSelf="center">A</Heading>
                </Box>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    stt_result: state.stt_result,
    correct_pronunciation: state.correct_pronunciation,
    phonetic_transcription: state.phonetic_transcription,
    google_result: state.google_result
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Practice)