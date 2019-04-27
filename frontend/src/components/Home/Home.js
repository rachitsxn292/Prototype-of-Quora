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
            answers: [],
            questions: [],
            answerBox:'',
            anonymousStatus: false,
            anonymous: 'Not Anonymous'
        }
        this.anonymousSelect = this.anonymousSelect.bind(this);
    
    }

    anonymousSelect(event){
        this.setState({
            anonymousStatus: event.target.value
        })
    }

    uploadFile(){

    }

    // componentDidMount(){
    //     axios.get('http://localhost:3001/questions', {params: {email: localStorage.getItem('email')}}).then(result=>{
    //         this.setState({
    //             questions: this.state.questions.concat(result.data)
    //         })
    //     });
    // }

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }

        // var display = this.state.data.map(answerPar => {
            

        // })
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
                                  Hello
                            </h4>
                            <div class="card-body">
                                <p><img class="img-profile rounded-circle" src={localStorage.image} height="40" width="40" /> {localStorage.fname} {localStorage.lname}, <small>Answered April 4</small></p>
                                <p><small><a class="nav-link" href="#" onClick={()=>{
                                    this.setState({
                                       answerBox: <div> 
                                                        <p><small><img class="img-profile rounded-circle" src={localStorage.image} height="30" width="30" /> {localStorage.fname} {localStorage.lname}</small></p>
                                                        <nav class="navbar navbar-expand-sm bg-light navbar-light">
                                                            {/* <div class="container-fluid">    */}
                                                                <ul class="navbar-nav">
                                                                    <li class="nav-item">
                                                                        <a class="nav-link" href="#"><button data-toggle="modal" data-target="#myModal"><i class='far fa-image' style={{fontSize: "32px"}}></i></button></a> 
                                                                    </li>
                                                                    <li class="nav-item">&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        <select name="anonymousStatus" onChange={this.anonymousSelect} value={this.state.value} style={{height: "35px"}}>
                                                                            <option value="true">Anonymous</option>
                                                                            <option value="false">Not Anonymous</option>
                                                                        </select>
                                                                    </li>    
                                                            </ul>
                                                        </nav>
                                                        <textarea rows="10" cols="83" placeholder="Write your answer" required></textarea>
                                                        <a href="#"><button class="btn btn-sm btn-primary" type="submit">Submit</button></a>
                                                  </div> 
                                    })
                                }}><i class='far fa-edit'></i> Answer</a></small></p>
                                {this.state.answerBox}
                                <br/>
                                <p>
                                    ABCD
                                </p>

                            </div>
                            <div class="card-footer">
                               <p><small>307.3k views</small></p>
                               <p><a href="" onClick=""><i class="fa fa-arrow-up"></i> Upvote</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="" onClick=""><i class="fa fa-arrow-down"></i> Downvote</a></p>
                            </div>
                        </div>

                    </div>

                <div class="col-md-2">
                        Improve your feed
                </div>
                </div>
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Upload Image</h4>
                    </div>
                    <div class="modal-body">
                    <input type="file" onChange={this.onChange} name="file" id="file"/>
                    <button class="btn btn-sm btn-primary" onClick={this.uploadFile.bind(this)}>Upload</button>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )

        
    }
}
//export Home Component
export default Home;