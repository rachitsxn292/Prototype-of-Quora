import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//you may wanna copy this file for componenets
class Question extends Component {
    constructor() {
        super();



    }

    componentDidMount() { //IMPORTANT YOU can access redux state only in the componentDidMount
        // console.log("login value is"+this.props.loginValue)
    }

    render() {

        let redirectVar = null;

        return (
            <div>
                <div class="allquestionsinsidethisdiv ">
                    <div class="top7">
                        <div class="card text-left fontQuora ">
                            <a href="question">
                                <div class="text-black" > <h5 class="font-bold card-header" >What is the most foreign thing you've ever seen anyone eat for breakfast?</h5>
                                </div>

                            </a>
                            <div class=" text-secondary card-body">
                                <a>Answer.</a>  <a>Follow</a>

                            </div>
                        </div>
                    </div>

                    <div class="top7">
                        <div class="card text-left fontQuora ">
                            <a href="question">
                                <div class="text-black" > <h5 class="font-bold card-header" >If I speak Mandarin Chinese without tones, will I be understood?</h5>
                                </div>

                            </a>
                            <div class=" text-secondary card-body">
                                <a>Answer.</a>  <a>Follow</a>

                            </div>
                        </div>
                    </div>

                    <div class="top7">
                        <div class="card text-left fontQuora ">
                            <a href="question">
                                <div class="text-black" > <h5 class="font-bold card-header" >What is perfectly legal, but creepy as hell?</h5>
                                </div>

                            </a>
                            <div class=" text-secondary card-body">
                                <a>Answer.</a>  <a>Follow</a>

                            </div>
                        </div>
                    </div>

                    <div class="top7">
                        <div class="card text-left fontQuora ">
                            <a href="question">
                                <div class="text-black" > <h5 class="font-bold card-header" >As a doctor or nurse, what's the saddest scene you have ever witnessed?</h5>
                                </div>

                            </a>
                            <div class=" text-secondary card-body">
                                <a>Answer.</a>  <a>Follow</a>

                            </div>
                        </div>
                    </div>

                    <div class="top7">
                        <div class="card text-left fontQuora ">
                            <a href="question">
                                <div class="text-black" > <h5 class="font-bold card-header" >Do the people of Tibet really want independence?</h5>
                                </div>

                            </a>
                            <div class=" text-secondary card-body">
                                <a>Answer.</a>  <a>Follow</a>

                            </div>
                        </div>
                    </div>

                    <div class="top7">
                        <div class="card text-left fontQuora ">
                            <a href="question">
                                <div class="text-black" > <h5 class="font-bold card-header" >As a teacher, what are some of the best excuses a student gave that turned out to be true?</h5>
                                </div>

                            </a>
                            <div class=" text-secondary card-body">
                                <a>Answer.</a>  <a>Follow</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





//export this Component
export default Question;
