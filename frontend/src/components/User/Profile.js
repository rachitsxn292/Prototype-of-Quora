import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import env from '../environment'

//you wanna copy this file for componenets
class Profile extends Component {
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
                <h3>Profile</h3>
                <img src={localStorage.image} />
                <p>{localStorage.fname},{localStorage.lname}</p>
                <p>{localStorage.email}</p>
            </div>
           
        )
    }
}



//export this Component
export default Profile;
