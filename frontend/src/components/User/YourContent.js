import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import url from '../Url/Url';

class YourContent extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            role: "",
            answers: [],
            questions: [],
            answerBox: '',
            anonymousStatus: false,
            anonymous: 'Not Anonymous',
            questionsAskedList: [],
            questionsFollowedList: [],
            questionsAnsweredList: [],
            results: ["a"],
            contentType: "",

        }
        this.setContent = this.setContent.bind(this);
        this.loadAsked = this.loadAsked.bind(this);
        this.loadAnswered = this.loadAnswered.bind(this);
        this.loadFollowed = this.loadFollowed.bind(this);

    }
    componentWillMount() {

    }
    setContent = (e) => {
    

        this.setState({
            contentType: e
          });
          if (this.state.contentType == "asked") {
           this.loadAsked();
       }
       else if (this.state.contentType == "followed") {
        this.loadFollowed();
       }
       else if (this.state.contentType == "answered") {
        this.loadAnswered();       }
    }

    loadAsked(){
        const params = {
            createdby: "pspranjal443@gmail.com",
        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,
            },
        };
      
      axios.get(url.url+'questions/created'
        , options
      )
        .then((response) => {
          
          this.setState({
            questionsAskedList: response.data
          });
        });
    }

    loadFollowed(){
        const params = {
            user: "rachitsxn292@aol.com",
        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,
            },
        };
      
      axios.get(url.url+'questions/followedquestions'
        , options
      )
        .then((response) => {
            console.log("hit",response)
          this.setState({
            questionsFollowedList: response.data
          });
        });
    }

    loadAnswered(){
        const params = {
            owner: "pspranjal443@gmail.com",
        };
        const options = {
            params,
            headers: {
                'Authorization': localStorage.jwt,
            },
        };
      
      axios.get(url.url+'answers/answered'
        , options
      )
        .then((response) => {
        
          //update the state with the response data
          this.setState({
            questionsAnsweredList: response.data
          });
        });
    }

    render() {
        var divStyle = {
            margin: '30px'
          };
        let redirectVar = null;
        if (cookie.load('cookie')) {
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/home" />
        }
        if (!cookie.load('cookie')) {
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/home" />
        }
        let questionsAsked = this.state.questionsAskedList.map(item => {
            return (
                <div class="top7">
                 <li class="list-group-item">   <Link to='/questionCard' onClick={() => {
                    localStorage.setItem('questionID', item._id);
                    localStorage.setItem('question', item.question);
                }}> {item.question} <br/> <p class="text-secondary"> asked {item.posted}</p></Link></li>
                </div>
            )
        })

        let questionsFollowed = this.state.questionsFollowedList.map(item => {
            return (
                <div class="top7">
                <li class="list-group-item">   <Link to='/questionCard' onClick={() => {
                   localStorage.setItem('questionID', item._id);
                   localStorage.setItem('question', item.question);
               }}> {item.question} <br/> <p class="text-secondary"> followed {item.posted}</p></Link></li>
               </div>
            )
        })

        let questionsAnswered = this.state.questionsAnsweredList.map(item => {
            return (
                <div class="top7">
                <li class="list-group-item">   <Link to='/questionCard' onClick={() => {
                   localStorage.setItem('questionID', item._id);
                   localStorage.setItem('question', item.question);
               }}> {item.question} <br/> <p class="text-secondary"> answered {item.posted}</p></Link></li>
               </div>
            )
        })

        var contentType = localStorage.getItem("contentType");

        let display = this.state.results.map(questionsAnsweredList => {
            return (
                <h6>
                        Hello! Select a filter.
                </h6>
            )
        })
        if (this.state.contentType == "asked") {
             display =  questionsAsked ;
        }
        else if (this.state.contentType == "followed") {
             display =  questionsFollowed ;
        }
        else if (this.state.contentType == "answered") {
             display =  questionsAnswered ;
        }
        return (
            <div class="container">
                <div class="row" style={{margin : '20px'}}>

                    <div class="col-md-2">
                        <h6>  By Content Type </h6>
                        <p><Link to="/yourcontent" onClick={() => this.setContent( "asked") }><small>  Questions Asked </small></Link></p>
                        <p><Link to="/yourcontent" onClick={() => this.setContent( "followed") } ><small>  Questions Followed </small></Link></p>
                        <p><Link to="/yourcontent" onClick={() => this.setContent( "answered") }   ><small> Answers </small></Link></p>
                        <br />
                        <h6>  By Year </h6>
                        <p><Link to="/topic"><small>  2019 </small></Link></p>
                        <p><Link to="/topic"><small>  2018</small></Link></p>
                        <br />
                        <h6>  Sort Order </h6>
                        <p><Link to="/topic"><small>  Newest </small></Link></p>
                        <p><Link to="/topic"><small>  Oldest</small></Link></p>
                    </div>
                    <div class="col-md-8">
                        <div class="card">
                        {display}
                  
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default YourContent;