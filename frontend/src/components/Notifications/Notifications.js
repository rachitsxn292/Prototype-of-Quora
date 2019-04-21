import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import env from '../environment'

//you wanna copy this file for componenets
class Notifications extends Component {
    constructor() {
        super();

        this.state = {

        }

    }




    componentDidMount() {


    }


    render() {
        let redirectVar = null;
        if (cookie.load(env.logInCheck)) { //should be !cookie
            redirectVar = <Redirect to="/login" /> //not logged in then rediect
        }



        return (
            <div>
                {redirectVar}
                <h3>Notifications</h3>
                <div class="card" >
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Anunay followed you</li>
                        <li class="list-group-item">Somebody answered your question</li>
                        <li class="list-group-item">New answer to question you followed</li>
                    </ul>
                </div>
            </div>

        )
    }
}



//export this Component
export default Notifications;
