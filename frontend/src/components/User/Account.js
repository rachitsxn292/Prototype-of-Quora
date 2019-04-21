import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import env from '../environment'

//you wanna copy this file for componenets
class Account extends Component {
    constructor(){
        super();
 
        this.state = {  
 
        }
       
    }  

  


    componentDidMount(){ 
      
 
    }


    render(){
        let redirectVar = null;
        if(cookie.load(env.logInCheck)){ //should be !cookie
            redirectVar = <Redirect to= "/login"/> //not logged in then rediect
        }
    
        
 
        return(
            <div>
                {redirectVar}
                <h3>Account</h3>
                <div class="card" >
              <div class="card-header">
                <i class="fas fa-user-circle" ></i>
                Actions
  </div>
              <ul class=" small list-group list-group-flush">
              <a class="list-group-item" href="dashboard"> Dashboard</a>
              <a class="list-group-item" href="profile">Profile</a>
              <a class="list-group-item" href="followers"> Followers</a>
              <a class="list-group-item" href="following"> Following</a>
              <a class="list-group-item" href="questionsasked"> Questions asked</a>
              <a class="list-group-item" href="answered"> Answers by you</a>
              </ul>
            </div>
            </div>
           
        )
    }
}



//export this Component
export default Account;
