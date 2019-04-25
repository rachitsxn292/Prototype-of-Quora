import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from "react-redux";

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            email: "",
            role: "",


        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {

    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        this.props.onLogout();
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li></li>
                    
                    <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown"><img class="img-profile rounded-circle" src={localStorage.image} height="40" width="40" /></a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Profile</a>
                                    <a class="dropdown-item" href="#">Messages</a>
                                    <a class="dropdown-item" href="#">Your Content</a>
                                    
                                    <Link to="/" onClick={this.handleLogout} class="dropdown-item">Logout</Link>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#"><button class="btn btn-danger" type="submit">Add Question or Link</button></a>
                            </li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login" class="nav-link"><i class='fas fa-user'></i></Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (cookie.load('cookie')) {
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/home" />
        }
        if (!cookie.load('cookie')) {
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/login" />
        }





        return (
            <div>
                {redirectVar}
                <nav class="navbar navbar-expand-sm bg-light navbar-light">
                    <div class="container-fluid">
                        <div class="navbar-header">

                            <Link to="/home" class="navbar-brand"><img src="logo.png" height='30' width='120' alt="Profile Pic" /> </Link>
                        </div>

                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#"><i class='far fa-file-alt'></i> Home</a>
                            </li>
                            
                            <li class="nav-item">
                            <a class="nav-link" href="#"><i class='far fa-edit'></i> Answers</a>
                            </li>

                            <li class="nav-item">
                            <a class="nav-link" href="#"><i class='fas fa-bell'></i> Notifications</a>
                            </li>

                            <form class="form-inline" action="/action_page.php">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search Quora" />
                                <button class="btn btn-danger" type="submit">Search</button>
                            </form>


                        </ul>
                

                        {navLogin}

                        <ul class="nav navbar-nav navbar-right">
                        
                        </ul>
                    </div>
                </nav>



            </div>
        )




    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispachToProps = dispatch => {
    return {
        onLogout: () => dispatch({
            type: "LOGOUT",

        }),

    };
};

//export Home Component
export default connect(
    mapStateToProps,
    mapDispachToProps
)(Navbar);