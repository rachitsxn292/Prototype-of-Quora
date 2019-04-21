import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import env from '../environment'

//you wanna copy this file for componenets
class Inbox extends Component {
    constructor(){
        super();
 
        this.state = {  
        emailID: cookie.load('emailID') ,
        userName: cookie.load('userName') ,
        showNewSubmission: false,
        showViewSubmission: false,
        to:"",
        the_body:"",
        messages: []
        }
       
        this.handle_showNewSubmission = this.handle_showNewSubmission.bind(this);
        this.handle_showViewSubmission = this.handle_showViewSubmission.bind(this);
        this.submit_AnnouncementForm = this.submit_AnnouncementForm.bind(this);

    }  

    submit_AnnouncementForm = (e) => {
        var headers = new Headers();

        e.preventDefault();//to prevents page from refreshing
        const messageData = {
            to: this.state.to,
            message: this.state.the_body,
            from: this.state.emailID,
            fromName: this.state.userName,
          
        }   
             //set the with credentials to true
             axios.defaults.withCredentials = true;
             //make a post request with the user data

             axios.post(env.url + 'message/create', messageData)
                 .then(response => {
                    
                     if (response.status === 200) {
                        //announcement added
                        alert("Message Sent");
                        this.setState({
                            the_body : "",
                            to: "",
                        })

                        document.getElementById("bodyy").value = "";
                        document.getElementById("headd").value = "";


                     } else {
                         this.setState({
                           
                         })
                     }
                 });  
    }

    handle_showNewSubmission = () => {
        this.setState({ showNewSubmission: true, showViewSubmission: false })
    }

    handle_showViewSubmission = () => {

     this.loadMessages();
        this.setState({ showViewSubmission: true, showNewSubmission: false })
    }

   loadMessages()
   {
    var idParam =  this.state.emailID;
    axios.get(env.url + 'message/get'
      , { params: { id: idParam } }
    )
      .then((response) => {
        //update the state with the response data
        this.setState({
          messages: response.data
        });
      });
   }

    componentDidMount(){ //IMPORTANT YOU can access redux state only in the componentDidMount
       // console.log("login value is"+this.props.loginValue)
       this.loadMessages();
 
    }
    head_ChangeHandler = (e) => {
        this.setState({
            to : e.target.value
        })
    }

    body_ChangeHandler = (e) => {
        this.setState({
            the_body : e.target.value
        })
    }

    render(){
        const { showNewSubmission } = this.state;
        const { showViewSubmission } = this.state;
        let redirectVar = null;
        if(cookie.load(env.logInCheck)){ //should be !cookie
            redirectVar = <Redirect to= "/login"/> //not logged in then rediect
        }
        let messagesDisplayed = this.state.messages.map(msg => {
            return (
                <div class="top7">
      <div class="card">
                <h5 class="card-header">{msg.fromName} </h5>
                    <div class="card-body">
                    {msg.message}
                    </div>
                </div>
                </div>
         )} );
        
 
        return(
            <div>
                {redirectVar}
                <h3>Inbox</h3>

                <button type="button" onClick={this.handle_showViewSubmission} class="btn btn-outline-primary btn-lg">View Messages</button>
                <button type="button" onClick={this.handle_showNewSubmission} class="btn btn-outline-success btn-lg">Create Message</button>

                <div style={{ display: (showNewSubmission ? 'block' : 'none') }}>
                <div class="card">
                    <h5 class="card-header">New Message</h5>
                    <div class="card-body">
                    <form onSubmit={this.submit_AnnouncementForm}>

                    <div class="form-group row">
                        <label for="headd" class="col-sm-2 col-form-label">To (email):</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.head_ChangeHandler}  class="form-control" id="headd" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="bodyy" class="col-sm-2 col-form-label">Message:</label>
                        <div class="col-sm-10">
                            <input type="text" onChange = {this.body_ChangeHandler}  class="form-control" id="bodyy" required />
                        </div>
                    </div>
                    <input type="submit" class="btn dii btn-primary"></input>
                        </form>


                    </div>
                </div>
                </div>
                <div style={{ display: (showViewSubmission ? 'block' : 'none') }}>

                   
 {messagesDisplayed}

                </div>
            </div> 
        )
    }
}



//export this Component
export default Inbox;
