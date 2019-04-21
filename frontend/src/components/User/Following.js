import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import env from '../environment'

//you wanna copy this file for componenets
class Following extends Component {
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
                <h3>Following</h3>
   
            </div>
           
        )
    }
}



//export this Component
export default Following;
