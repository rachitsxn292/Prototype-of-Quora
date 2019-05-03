import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import url from "../Url/Url";

class ProfileDisplay extends Component {
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
            anonymous: 'Not Anonymous',
            fname:"",
            lname:"",
            edu:[],
            comp:[],
            image:"",
            about:"",
            state:"",
            city:"",
            profileCredential:"",
            zipcode:"",
            profile:[]

        }
        this.getProfile = this.getProfile.bind(this);
        
      
    
    }
    componentWillMount() {
        

    }
    getProfile = e => {
        var headers = new Headers();
      const params = {
        id: localStorage.profiledisplay
      };
      const options = {
        params,
        headers: {
          Authorization: localStorage.jwt
        }
      };
      axios.get(url.url + "profile/id", options).then(response => {
        //update the state with the response data
        this.setState({
          profile: this.state.profile.concat(response.data)
        });
  
        this.state.profile.map(item => {
          this.setState({
            fname: item.fname,
            lname: item.lname,
            about: item.about,
            city: item.city,
            profileCredential: item.profilecredential,
            state: item.state,
            zipcode: item.zipcode,
            edu:item.education,
            comp:item.company
            
          });
  
        });
        if (this.state.edu)
        {
        var edu=[...this.state.edu];
        console.log("education",edu);}
        if (this.state.comp)
        {
        var comp=[...this.state.comp];
        console.log("company start",comp);}
        
      });
      };
  
    componentDidMount() {
        var headers = new Headers();
      const params = {
        id: localStorage.profiledisplay
      };
      const options = {
        params,
        headers: {
          Authorization: localStorage.jwt
        }
      };
      axios.get(url.url + "profile/id", options).then(response => {
        //update the state with the response data
        console.log("response",response.data)
        this.setState({
            profile: this.state.profile.concat(response.data)
          });
  
        this.state.profile.map(item => {
          this.setState({
            fname: item.fname,
            lname: item.lname,
            about: item.about,
            city: item.city,
            profileCredential: item.profilecredential,
            state: item.state,
            zipcode: item.zipcode,
            edu:item.education,
            comp:item.company
            
          });
  
        });
        if (this.state.edu)
        {
        var edu=[...this.state.edu];
        console.log("education",edu);}
        if (this.state.comp)
        {
        var comp=[...this.state.comp];
        console.log("company start",comp);}
        
      });
    }

    render() {
        let redirectVar = null;
        if (cookie.load('cookie')) {
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/home" />
        }
        if (!cookie.load('cookie')) {
            console.log("in Navbar redirectVar")
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div class="container">
            <p>This is Profile Page</p>
            <p>Profile mongodb Id: {localStorage.profiledisplay} (use this to buid this page)</p>
            <div class="body-div">
          <br />
          <div class="row">
            <div class="col-md-3">
              <img
                src={this.state.image} class="rounded-circle" alt="Profile Pic" width="170" height="155" />
              <br /> <br />
            </div>
            </div>
            </div>
            </div>
            
        )
    }
}

export default ProfileDisplay;