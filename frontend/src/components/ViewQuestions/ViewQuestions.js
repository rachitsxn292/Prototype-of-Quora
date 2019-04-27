import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import url from '../Url/Url';

class ViewQuestions extends Component {
    constructor() {
        super();
        this.state = {
            questions:[]
        }
    }

    componentDidMount(){
        let email = localStorage.email;
        axios.get(url.url+'questions',{params: {email}})
                .then((response) => {
                    console.log(response.data);
                this.setState({
                    questions : this.state.questions.concat(response.data) 
                });
            });
    }

    

    render() {
        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        let details=this.state.questions.map(question => {
            return(
                <div class="card bg-light text-dark">
                            <div class="card-body">
                                <p><img class="img-profile rounded-circle" src={localStorage.image} height="40" width="40" /> {localStorage.fname} {localStorage.lname}, <small>Asked On {question.posted}</small></p>
                            </div>
                            <h4>
                                 <p>{question.question}</p> 
                            </h4>
                            <div>
                            <button class="btn btn-danger" type="submit"><i class="far fa-edit"> Edit</i></button>
                            </div>
                            <br/><br/>
                </div>
                       
                
            )
        })
        return (
            <div class="container">
                <br />
                <div class="row">
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-8">
                        <div class="card bg-light text-dark">
                            
                                <br />
                                  {details}
                            
                        </div>
                    </div>
                    <div class="col-md-2"> 
                    </div>
                </div>
            </div>
        )


    }
}
//export Home Component
export default ViewQuestions;