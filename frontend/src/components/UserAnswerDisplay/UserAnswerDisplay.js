import React, { Component } from 'react';
import Axios from 'axios';
import url from '../Url/Url';
import AnswerEdit from './AnswerEdit';

class UserAnswerDisplay extends Component {
    constructor() {
        super();
        this.state = {
            answers: []
        }   
    }

    uploadFile(){
        
    }

    componentDidMount(){
        Axios.get(url.url + 'answers/useranswer', {params: {email: localStorage.getItem('email')}}).then(result=>{
            console.log('MY ANSWER ', result.data);
            this.setState({
                answers: this.state.answers.concat(result.data)
            })
        })
    }

    render() {
        var display = this.state.answers.map(answer=>{
            return(
                <AnswerEdit key={answer._id} ansID={answer._id} id={answer.questionID} date={answer.posted} answer={answer.answer}/>
            );
        });

        return (
            <div>
                <div class="container">

                    <br />
                    <div class="row">

                        <div class="col-md-2">
                        </div>

                        <div class="col-md-8">
                        {display}
                        {/* {question answer comes here} */}
                        </div>

                        <div class="col-md-2">
                            Improve your feed
                        </div>
                    </div>
                    <div id="myModal" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Upload Image</h4>
                                </div>
                                <div class="modal-body">
                                    <input type="file" onChange={this.onChange} name="file" id="file" />
                                    <button class="btn btn-sm btn-primary" onClick={this.uploadFile.bind(this)}>Upload</button>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAnswerDisplay;