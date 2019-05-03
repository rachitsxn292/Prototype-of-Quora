import React, { Component } from 'react';
import Axios from 'axios';
import url from '../Url/Url';

class AnswerCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answerBox: '',
            answerPar: [],
            answer: '',
            anonymousStatus: '',
            changeUp: 0,
            changeDown: 0,
            comment: '',
            comments: [],
            commentsDisp: ''
        }
        this.onComment = this.onComment.bind(this);
    }

    // componentDidMount() {
    //     // console.log('MYDID', this.props.id);
    //     // Axios.get(url.url + 'answers', { params: { _id: this.props.id } }).then(docs => {
    //     //     this.setState({
    //     //         answerPar: docs.data
    //     //     })

    //     // })
    // }
    onComment(event) {
        this.setState({
            comment: event.target.value
        })
    }

    render() {
        var prevComments = '';
        return (

            <div>

                <div class="card-body">
                    {/* <p><img class="img-profile rounded-circle" src={localStorage.image} height="40" width="40" /> {this.state.answerPar.fname} {this.state.answerPar.lname}, <small>{this.state.answerPar.date}</small></p> */}
                    <p><img class="img-profile rounded-circle" src={localStorage.image} height="40" width="40" /> {this.props.fname} {this.props.lname}, <small>{this.props.date.substr(0, 10)}, {this.props.date.substr(11, 5)}</small></p>
                    <br />
                    <p>
                        <div dangerouslySetInnerHTML={{__html: this.props.answerDisp}}></div>
                    </p>
                </div>

                <div class="card-footer">
                    <p><small>307.3k views</small></p>
                    <p><a href="" onClick={(e) => {
                        
                        e.preventDefault();
                        const user = {
                            fname: localStorage.getItem('fname'),
                            lname: localStorage.getItem('lname'),
                            email: localStorage.getItem('email')
                        }
                        Axios.post(url.url + 'answers/upvote', { _id: this.props.id }).then(result => {
                            // for real time changes
                            this.setState({
                                changeUp: 1
                            })
                        })
                    }}><i class="fa fa-arrow-up custom"></i> Upvote&nbsp;     {this.props.upVote + this.state.changeUp}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="" onClick={(e) => {
                        e.preventDefault();
                        const user = {
                            fname: localStorage.getItem('fname'),
                            lname: localStorage.getItem('lname'),
                            email: localStorage.getItem('email')
                        }
                        Axios.post(url.url + 'answers/downvote', { _id: this.props.id }).then(result => {
                            // for real time changes
                            this.setState({
                                changeDown: 1
                            })
                        })
                    }}><i class="fa fa-arrow-down custom"></i> Downvote&nbsp;    {this.props.downVote + this.state.changeDown}</a></p><br />
                    <p><small>Comment</small></p>

                    <table>
                        <tr>
                            <td><textarea rows="1" cols="63" name="comment" id="comment" placeholder="Comment..." value={this.state.value} onChange={this.onComment}></textarea></td>
                            <td><p><small><a class="nav-link" href="#" onClick={() => {
                                const { comment } = this.state;
                                const _id = this.props.id;
                                Axios.post(url.url + 'answers/comment', { _id, comment }).then(result => {
                                    alert(result.data);
                                })
                            }}>Submit</a></small></p></td>
                            <td><p><small><a class="nav-link" href="#" onClick={() => {
                                const _id = this.props.id;
                                Axios.get(url.url + 'answers/comment', { params: { _id: _id } }).then(result => {
                                    console.log('COMMENT GET DaTA', result.data);
                                    this.setState({
                                        comments: this.state.comments.concat(result.data)
                                    })
                                    prevComments = this.state.comments.map(com => {
                                        console.log('COMMENT', com.comment);
                                        return (
                                            <tr key={com._id}>
                                                <td><p>{com.comment}</p></td>
                                                <td><i><p style={{WebkitTextFillColor: '#808080'}}><small>{com.posted.substr(0,10)},  {com.posted.substr(11,5)}</small></p></i></td>
                                            </tr>);
                                    })
                                    this.setState({
                                        commentsDisp: prevComments
                                    })

                                })

                            }}>View All</a></small></p></td>
                        </tr>
                    </table>
                    <table>
                        <th>Previous Comments</th>
                        {this.state.commentsDisp}
                    </table>


                </div><br /><br />
            </div>

        );
    }
}

export default AnswerCard;