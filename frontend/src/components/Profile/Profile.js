import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import url from "../Url/Url";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      file_status: "",
      profile: [],
      authFlag: false,
      status: "",
      imagepath: "",
      email: "",
      mobile: "",
      about: "",
      city: "",
      country: "",
      company: "",

      school: "",
      hometown: "",
      languages: "",
      gender: "",
      fname: "",
      lname: "",
      profileCredential: "",
      position:"",
      startyear:"",
      endyear:"",
      current:"",
    };
    //Bind the handlers to this class

    this.mobileChangeHandler = this.mobileChangeHandler.bind(this);
    this.startyearChangeHandler = this.startyearChangeHandler.bind(this);
    this.endyearChangeHandler = this.endyearChangeHandler.bind(this);
    this.currentChangeHandler = this.currentChangeHandler.bind(this);
    this.positionChangeHandler = this.positionChangeHandler.bind(this);
    this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
    this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.profileCredentialChangeHandler = this.profileCredentialChangeHandler.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateProfileCredentialButton = this.updateProfileCredentialButton.bind(this);
    this.updateAboutButton = this.updateAboutButton.bind(this);


  }

  //get the books data from backend
  componentDidMount() {
    var headers = new Headers();
    const params = {
      email: localStorage.email
    };
    const options = {
      params,
      headers: {
        Authorization: localStorage.jwt
      }
    };
    axios.get(url.url + "profile/email", options).then(response => {
      //update the state with the response data
      this.setState({
        profile: this.state.profile.concat(response.data)
      });

      this.state.profile.map(item => {
        this.setState({
          imagepath: this.state.imagepath.concat(item.image),
          email: item.email,
          fname: item.fname,
          lname: item.lname,
          mobile: item.mobile,
          about: item.about,
          city: item.city,
          country: item.country,
          company: item.company,

          school: item.school,
          hometown: item.hometown,
          languages: item.languages,
          gender: item.gender,
          profileCredential: item.profilecredential
        });
      });
    });
  }

  mobileChangeHandler = e => {
    this.setState({
      mobile: e.target.value
    });
  };
  currentChangeHandler = e => {
    this.setState({
      current: e.target.value
    });
  };

  positionChangeHandler = e => {
    this.setState({
      position: e.target.value
    });
  };

  aboutChangeHandler = e => {
    this.setState({
      about: e.target.value
    });
  };
  startyearChangeHandler = e => {
    this.setState({
      startyear: e.target.value
    });
  };
  endyearChangeHandler = e => {
    this.setState({
      endyear: e.target.value
    });
  };
  profileCredentialChangeHandler = e => {
    this.setState({
      profileCredential: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };

  countryChangeHandler = e => {
    this.setState({
      country: e.target.value
    });
  };

  companyChangeHandler = e => {
    this.setState({
      company: e.target.value
    });
  };

  schoolChangeHandler = e => {
    this.setState({
      school: e.target.value
    });
  };

  hometownChangeHandler = e => {
    this.setState({
      hometown: e.target.value
    });
  };

  fnameChangeHandler = e => {
    console.log("in here");
    this.setState({
      fname: e.target.value
    });
  };
  lnameChangeHandler = e => {
    this.setState({
      lname: e.target.value
    });
  };
  languagesChangeHandler = e => {
    this.setState({
      languages: e.target.value
    });
  };

  genderChangeHandler = e => {
    this.setState({
      gender: e.target.value
    });
  };

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("email", localStorage.email);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.jwt
      }
    };
    axios
      .post(url.url + "profile/imgupload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
        this.setState({
          file_status: response.data.message
        });
      })
      .catch(error => { });
  }
  onChange(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  updateName = (e) => {
    console.log("submit name called")
    var headers = new Headers();

    //prevent page from refresh
    e.preventDefault();

    console.log("in updatename button");
    const data = [
      { propName: "email", value: localStorage.email },
      { propName: "fname", value: this.state.fname },
      { propName: "lname", value: this.state.lname }
    ];
    const options = {
      data,
      headers: {
        Authorization: localStorage.jwt
      }
    };
    const data1 = {
      fname: this.state.fname,
      lname: this.state.lname
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.patch(url.url + "profile", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.props.onProfileLoad(data1);

        this.setState({
          authFlag: true,
          status: response.data.message
        });
      } else {
        console.log("Status Code : ", response.status);
        this.setState({
          status: response.data
        });
      }
    });
  };

  updateProfileCredentialButton = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();

    const data = [
      { propName: "email", value: localStorage.email },
      { propName: "profilecredential", value: this.state.profileCredential },

    ];

    const data1 = {
      profileCredential: this.state.profileCredential,

    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.patch(url.url + "profile", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.props.onProfileLoad(data1);

        this.setState({
          authFlag: true,
          status: response.data.message
        });
      } else {
        console.log("Status Code : ", response.status);
        this.setState({
          status: response.data
        });
      }
    });
  };

  updateAboutButton = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();

    const data = [
      { propName: "email", value: localStorage.email },
      { propName: "about", value: this.state.about },

    ];

    const data1 = {
      about: this.state.about,

    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.patch(url.url + "profile", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.props.onProfileLoad(data1);

        this.setState({
          authFlag: true,
          status: response.data.message
        });
      } else {
        console.log("Status Code : ", response.status);
        this.setState({
          status: response.data
        });
      }
    });
  };





  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    console.log(this.state.imagepath);
    var path = window.location.origin + "/uploads/" + this.state.imagepath;
    if (localStorage.getItem("google")) {
      path = this.state.imagepath;
    }

    console.log(path);
    var ref = "#";
    ref = ref + localStorage.email;
    var ref_about = "#";
    ref_about = ref_about + "about";
    var ref_name = "#name";
    var aboutText = "Write description about yourself";
    if (this.state.about) {
      aboutText = "Edit";
    }
    var credentialText = "Add profile credential";
    if (this.state.profileCredential) {
      credentialText = "Edit";
    }

    return (
      <div class="container">
        <div class="body-div">
          <br />
          <div class="row">
            <div class="col-md-3">
              <img
                src={path}
                class="rounded-circle"
                alt="Profile Pic"
                width="170"
                height="155"
              />
              <br />
              <br />
              <div>
                <p>
                  <form onSubmit={this.onFormSubmit}>
                    <div class="custom-file mb-3">
                      <input
                        type="file"
                        name="myImage"
                        onChange={this.onChange}
                        class="custom-file-input"
                      />
                      <label class="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Upload
                    </button>
                  </form>
                  <p>{this.state.file_status}</p>
                </p>
              </div>
            </div>
            <div class="col-md-7">
              <table
                align="center"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td>
                    <div id="name" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close">
                          X
                      </a>
                        <h4>Update Name </h4>



                        <input
                          onChange={this.aboutChangeHandler}
                          type="text"
                          class="form-control"
                          value={this.state.fname}
                        />
                        <br/>
                        

                        <input
                          onChange={this.aboutChangeHandler}
                          type="text"
                          class="form-control"
                          value={this.state.lname}
                        />
                        <br/> <br/> <br/> 

                        <button type="reset" ><a href="#close">
                          Cancel</a>
                        </button>

                        <button onClick={this.updateName} class="btn btn-primary">
                          Update
                      </button>
                      </div>
                    </div>
                    <p><font size="6">{this.state.fname} {this.state.lname} </font> <a href={ref_name}>Edit</a></p>
                  </td>
                </tr>
              


                <tr>
                  <td>
                    <div id={localStorage.email} class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close">
                          X
                      </a>
                        <h4>Edit credentials</h4>
                        <p>Credentials also appear on answers you write.</p>

                        <p>
                          <i class="fas fa-user" /> Add profile credential
                      </p>
                      <textarea onChange = {this.profileCredentialChangeHandler} rows="7" cols="50" class="form-control" name="content" value={this.state.profileCredential} />
                        
                        <br/> <br/> <br/>
                        <button type="reset" ><a href="#close">
                          Cancel</a>
                        </button>

                        <button onClick={this.updateProfileCredentialButton} class="btn btn-primary">
                          Update
                      </button>
                      </div>
                    </div>
                    <p><font size="4">{this.state.profileCredential} </font> <a href={ref}>{credentialText}</a></p>
                  </td>
                </tr>
                <tr />
                <tr>
                  <td>
                    <div id="about" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close">
                          X
                      </a>
                        <h4>Write description about yourself </h4>


                        <textarea onChange = {this.aboutChangeHandler} rows="7" cols="50" class="form-control" name="about" value={this.state.about} />
                        
                         <br/> <br/> <br/>
                        <button type="reset" ><a href="#close">
                          Cancel</a>
                        </button>

                        <button onClick={this.updateAboutButton} class="btn btn-primary">
                          Update
                      </button>
                      </div>
                    </div>
                    <p><font size="4">{this.state.about} </font> <a href={ref_about}>{aboutText}</a></p>
                  </td>
                </tr>
                <tr />
              </table>
            </div>
            <div class="col-md-2">
              <table
                align="center"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td>Credentials and Highlights</td>
                  </tr>
                  <tr>
                    <td>
                    <div id="employment" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close">
                          X
                      </a>
                        <h4>Add employment credential </h4>
                        <br/>
                        <br/>
                        <div class="form-group row">
                        <div class="col-5">
                        Position
                        </div>
                        <div class="col-7">
                        <input
                          onChange={this.positionChangeHandler}
                          type="text"
                          class="form-control"
                          value={this.state.position}
                          placeholder="position"
                        />
                        </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                        <div class="col-5">
                        Company/Organisation
                        </div>
                        <div class="col-7">
                        <input
                          onChange={this.companyChangeHandler}
                          type="text"
                          class="form-control"
                          value={this.state.company}
                          placeholder="company/organisation"
                        />
                        </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                        <div class="col-5">
                        Start Date
                        </div>
                        <div class="col-7">
                        <input
                          onChange={this.startyearChangeHandler}
                          type="date"
                          class="form-control"
                          value={this.state.startyear}
                          placeholder="start year"
                          
                        />
                        </div>
                        </div>
                        
                        <br/>
                        <div class="form-group row">
                        <div class="col-5">
                      End Dates
                        </div>
                        <div class="col-7">
                        <input
                          onChange={this.endyearChangeHandler}
                          type="date"
                          class="form-control"
                          value={this.state.endyear}
                          placeholder="end year"
                          
                        />
                        </div>
                        </div>
                        <br/>
                        
                         <br/> <br/> <br/>
                         <a href="#close"><button type="reset" class="btn btn-danger">
                          Cancel
                        </button></a>

                        <button onClick={this.updateAboutButton} class="btn btn-primary">
                          Update
                      </button>
                      </div>
                    </div>
                    <p><font size="4">{this.state.about} </font> <a href="#employment">Add Employment credential</a></p>
                    </td>
                    </tr>
                  </table>
                  </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispachToProps = dispatch => {
  return {
    onProfileLoad: data =>
      dispatch({
        type: "PROFILE_LOAD",
        email: data.email,
        mobile: data.mobile,
        about: data.about,
        city: data.city,
        country: data.country,
        company: data.company,

        school: data.school,
        hometown: data.hometown,
        languages: data.languages,
        gender: data.gender
      })
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispachToProps
)(Profile);
