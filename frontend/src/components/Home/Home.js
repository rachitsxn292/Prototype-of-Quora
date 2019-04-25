import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            email: "",
            role: "",
            books: [],
            student_course: [],


        }
    }



    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        return (
            <div class="container">
                <br />
                <div class="row">

                    <div class="col-md-2">
                    <p><a href=""><img class="img-profile rounded" src="warfare.jpg" height="25" width="25" /><small> Warfare</small></a></p>
                    </div>

                    <div class="col-md-8">
                        <div class="card bg-light text-dark">
                            <h4 class="card-title">
                                <br />
                                  What are some of the best professional sound effects libraries?
                            </h4>
                            <div class="card-body">
                                <p><img class="img-profile rounded-circle" src={localStorage.image} height="40" width="40" /> {localStorage.fname} {localStorage.lname}, <small>Answered April 4</small></p>
                                <p>
                                    Soundsnap is a great option if you like being able to find your sounds on the internet.
                                    They have 250,000+ sounds, that you can find via keywords pretty quickly. Lots of pro sound guys use it to find specific sounds they don’t have or need more of.
                                    You can buy 5 or 20 at a time, or pay for an annual unlimited download subscription too.
                                    You can search and audition for free too, so you can see if it has what you;re looking for before you buy.
                                </p>

                            </div>
                            <div class="card-footer">
                               <p><small>307.3k views</small></p>
                               <p><a href="" onclick=""><i class="fa fa-arrow-up"></i> Upvote</a>  <a href="" onclick=""><i class="fa fa-arrow-down"></i> Downvote</a></p>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-2">
                        Improve your feed
                </div>
                </div>
            </div>
        )


    }
}
//export Home Component
export default Home;