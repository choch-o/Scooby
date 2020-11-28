import React from "react";
import {connect} from 'react-redux'
import {getPosts,deletePost,uploadFile} from '../Redux/actions.js'
import {Box, Button, Text, TextArea} from 'grommet';


class UploadAudioFile extends React.Component {
    componentDidMount() {
    }

    state = {
        selectedFile: null,
        script: "",
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    onFileUpload = () => {
        const formData = new FormData();

        formData.append("file", this.state.selectedFile);
        formData.append("name", this.state.selectedFile.name);

        console.log(this.state.selectedFile);

        this.props.uploadFile(formData);
    }

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <Box
                    direction="row"
                    pad="medium"
                >
                    <Box fill="horizontal" margin="medium">
                        <TextArea
                            pad="medium"
                            placeholder="enter your script to practice"
                            value={this.state.script}
                            onChange={event => this.setState({script: event.target.value})}
                        />
                    </Box>
                    <Box width="400px" justify="center" direction="column">
                        <Text size="medium" margin={{"bottom": "xsmall"}} weight="bold">upload your recording</Text>
                        <input type="file" onChange={this.onFileChange} />
                    </Box>
                    <Button margin="medium" primary label="Practice" onClick={this.onFileUpload}/>
                </Box>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    stt_result: state.stt_result,
    speechace_result: state.speechace_result
})

const mapDispatchToProps = {
    getPosts ,deletePost, uploadFile
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAudioFile)