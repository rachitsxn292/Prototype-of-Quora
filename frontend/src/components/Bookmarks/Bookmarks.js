import React, { Component } from 'react';
import url from '../Url/Url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Axios from 'axios';
class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            answers: []
        }
    }

    loadTopics() {
        //loads topics to show on left side of home screen
        axios.get(url.url + 'topics')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    topics: response.data
                });
            });
    }

    componentDidMount(){
        this.loadTopics();
        var questionID = localStorage.getItem('questionID');
        var email = localStorage.getItem('email');
        axios.get(url.url+'answers/bookmark', {params:{questionID, email}}).then(result=>{
            this.setState({
                answers: result.data
            })
        })
    }

    render() {
        var bookQuestion = 'No Bookmarks Added';
        let answersMap = '';
        if(this.state.answers.length > 0){

            bookQuestion = localStorage.getItem('question');
            answersMap = this.state.answers.map(answer=>{
                return(
                    <div key={answer._id} class="card-body">
                    <tr>
                        <td><p><div dangerouslySetInnerHTML={{ __html: answer.answer }}></div></p></td>
                        <td><p><a href="#" onClick={() => {
                            console.log(answer);
                            // const questionID = answer.questionID;
                            const email = localStorage.getItem('email');
                            const _id = answer.answerID;
                            Axios.post(url.url + 'answers/bookmark', { _id, email }).then(result => {
                                if (result.data.bookmarked) {
                                    alert('Added to Bookmarks');
                                }
                                else {
                                    alert('Removed from Bookmarks');
                                }
                            })
                        }}><i class="fa fa-bookmark"></i></a></p></td>
                    </tr>
                        
                    </div>
                );
            })
        }
        
        let topics = this.state.topics.map(topic => {
            return (
                <p><Link to="/topic"><img class="img-profile rounded" src={"/uploads/topic/" + topic.picture} height="25" width="25" /><small> {topic.topic}</small></Link></p>
            )
        })

        return (
            <div>
                <div class="container">

                    <br />
                    <div class="row">

                        <div class="col-md-2">
                            <p><a href=""><img class="img-profile rounded" src="warfare.jpg" height="25" width="25" /><small> Warfare</small></a></p>
                            {topics}
                            <p><Link to="/topic"><small>  Add new Topic</small></Link></p>
                        </div>
                        <div>
                        <div>
                            <div class="card bg-light text-dark">
                                <h4 style={{ paddingLeft: '25px', paddingRight: '25px' }} class="card-title">
                                    <br />
                                    {bookQuestion}
                                </h4>
                                {/* {AnswerCard comes here} */}
                                
                            </div>
                            {answersMap}

                        </div>
                        </div>
                        <div class="col-md-2">
                            Improve your feed
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookmarks;