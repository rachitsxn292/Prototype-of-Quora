import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import url from "../Url/Url";
import * as state from "./state";
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      feeds: "Profile",
      question: [],
      answer: [],
      followers: [],
      following: [],
      bookmarked: [],
      file: null,
      file_status: "",
      profile: [],
      authFlag: false,
      status: "",
      about: "",
      city: "",
      company: "",
      school: "",
      fname: "",
      lname: "",
      profileCredential: "",
      position: "",
      startyear: "",
      endyear: "",
      educationdegree: "",
      educationstart: "",
      educationend: "",
      state: "",
      zipcode: ""
    };
    //Bind the handlers to this class


    this.educationstartChangeHandler = this.educationstartChangeHandler.bind(
      this
    );
    this.educationendChangeHandler = this.educationendChangeHandler.bind(this);
    this.educationdegreeChangeHandler = this.educationdegreeChangeHandler.bind(
      this
    );
    this.startyearChangeHandler = this.startyearChangeHandler.bind(this);
    this.endyearChangeHandler = this.endyearChangeHandler.bind(this);

    this.positionChangeHandler = this.positionChangeHandler.bind(this);
    this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);

    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.profileCredentialChangeHandler = this.profileCredentialChangeHandler.bind(
      this
    );
    this.updateName = this.updateName.bind(this);
    this.updateProfileCredentialButton = this.updateProfileCredentialButton.bind(
      this
    );
    this.updateAboutButton = this.updateAboutButton.bind(this);
    this.updateEducationButton = this.updateEducationButton.bind(this);
  }

  componentWillMount() {
    //will be used to fetch User's feed details and count
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
    // axios.get(url.url + "profile/email", options).then(response => {
    //   //update the state with the response data
    //   this.setState({
    //     profile: this.state.profile.concat(response.data)
    //   });
    // });
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
          fname: item.fname,
          lname: item.lname,
          about: item.about,
          city: item.city,
          country: item.country,
          company: item.company,
          school: item.educationschool,
          profileCredential: item.profilecredential,
          comapany: item.companyname,
          position: item.companyposition,
          startyear: item.companystart,
          endyear: item.companyend,
          educationstart: item.educationstart,
          educationdegree: item.educationdegree,
          educationend: item.educationend,
          state: item.state,
          zipcode: item.zipcode
        });
      });
    });
  }

  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
  };

  zipcodeChangeHandler = e => {
    this.setState({
      zipcode: e.target.value
    });
  };

  educationendChangeHandler = e => {
    this.setState({
      educationend: e.target.value
    });
  };

  educationstartChangeHandler = e => {
    this.setState({
      educationstart: e.target.value
    });
  };

  educationdegreeChangeHandler = e => {
    this.setState({
      educationdegree: e.target.value
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
        let image = response.data.message;
        localStorage.setItem('image', image);
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

  updateName = e => {
    console.log("submit name called");
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
      { propName: "profilecredential", value: this.state.profileCredential }
    ];

    const data1 = {
      profileCredential: this.state.profileCredential
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
      { propName: "about", value: this.state.about }
    ];

    const data1 = {
      about: this.state.about
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

  updateExperienceButton = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();

    const data = [
      { propName: "email", value: localStorage.email },
      { propName: "companyname", value: this.state.company },
      { propName: "companyposition", value: this.state.position },
      { propName: "companystart", value: this.state.startyear },
      { propName: "companyend", value: this.state.endyear }
    ];

    const data1 = {
      company: this.state.company,
      position: this.state.position,
      startyear: this.state.startyear,
      endyear: this.state.endyear
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

  updateEducationButton = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();

    const data = [
      { propName: "email", value: localStorage.email },
      { propName: "educationschool", value: this.state.school },
      { propName: "educationdegree", value: this.state.educationdegree },
      { propName: "educationstart", value: this.state.educationstart },
      { propName: "educationend", value: this.state.educationend }
    ];

    const data1 = {
      school: this.state.school,
      educationdegree: this.state.educationdegree,
      educationend: this.state.educationend,
      educationstart: this.state.educationstart
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

  updateLocationButton = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();

    // zipcode validation
    var regexresult = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipcode);
    console.log("Result of zipcode regex", regexresult);

    //us state validation

    var checkstate = false;
    if (
      state.stateAbbreviations.includes(this.state.state) ||
      state.statenames.includes(this.state.state)
    ) {
      checkstate = true;
    }
    if (regexresult && checkstate) {
      const data = [
        { propName: "email", value: localStorage.email },
        { propName: "city", value: this.state.city },
        { propName: "state", value: this.state.state },
        { propName: "zipcode", value: this.state.zipcode }
      ];

      const data1 = {
        school: this.state.school,
        educationdegree: this.state.educationdegree,
        educationend: this.state.educationend,
        educationstart: this.state.educationstart
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
    } else if (regexresult == false && checkstate == true) {
      console.log("Invalid US zip code");
      alert("Please enter a valid US zip code!!");
    } else if (regexresult == true && checkstate == false) {
      console.log("Invalid US state: malformed_state exception");
      alert("Please enter a valid US State!! malformed_state exception");
    } else {
      console.log(
        "Invalid US zip code && Invalid US State!! malformed_state exception"
      );
      alert(
        "Please enter a valid US zip code and State!! malformed_state exception"
      );
    }
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
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
                src={localStorage.image} class="rounded-circle" alt="Profile Pic" width="170" height="155" />
              <br /> <br />
              <p>
                <div id="image" class="modalDialog">
                  <div>
                    <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                    <h4>Add/Update image </h4>
                    <br />
                    <form onSubmit={this.onFormSubmit}>
                      <div class="row">
                        <div class="col-md-6">
                          <input type="file" name="myImage" onChange={this.onChange} />
                        </div>
                        <div class="col-md-6">
                          <button type="submit" class="btn btn-primary">Upload</button>
                        </div>
                      </div>
                    </form>

                    <p>
                      <font color="red">{this.state.file_status}</font>
                    </p>
                    <br /><br />
                    <a href="#close"><button type="reset" onClick={() => { this.setState({ status: "" }); }} class="btn btn-danger">Cancel</button>{" "}</a>{" "}&nbsp;
                      </div>
                </div>
                <p>
                  <div><a href="#image">Add image</a></div>
                  
                </p>
              </p>


            </div>
            <div class="col-md-6">
              <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div id="name" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                        <h4>Update Name </h4>
                        <input onChange={this.fnameChangeHandler} type="text" class="form-control" value={this.state.fname} />
                        <br />
                        <input onChange={this.lnameChangeHandler} type="text" class="form-control" value={this.state.lname} />
                        <br /> <br /><br />
                        <p>
                          <font color="red">{this.state.status}</font>
                        </p>
                        <br /><br />
                        <a href="#close"><button type="reset" onClick={() => { this.setState({ status: "" }); }} class="btn btn-danger">Cancel</button>{" "}</a>{" "}&nbsp;
                        <button onClick={this.updateName} class="btn btn-primary">Update</button>
                      </div>
                    </div>
                    <p>
                      <font size="6">{this.state.fname} {this.state.lname}{" "}</font>{" "}<a href={ref_name}>Edit</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div id={localStorage.email} class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                        <h4>Edit credentials</h4>
                        <p>Credentials also appear on answers you write.</p>
                        <p><i class="fas fa-user" /> Add profile credential</p>
                        <textarea onChange={this.profileCredentialChangeHandler} rows="7" cols="50" class="form-control" name="content" value={this.state.profileCredential} />
                        <br /> <br /><br />
                        <p><font color="red">{this.state.status}</font></p>
                        <br /><br />
                        <a href="#close"><button type="reset" onClick={() => { this.setState({ status: "" }); }} class="btn btn-danger">Cancel</button></a>{" "}
                        &nbsp;
                        <button onClick={this.updateProfileCredentialButton} class="btn btn-primary">Update</button>
                      </div>
                    </div>
                    <p>
                      <font size="4">{this.state.profileCredential} </font>{" "}<a href={ref}>{credentialText}</a>
                    </p>
                  </td>
                </tr>
                <tr />
                <tr>
                  <td>
                    <div id="about" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                        <h4>Write description about yourself </h4>
                        <textarea onChange={this.aboutChangeHandler} rows="7" cols="50" class="form-control" name="about" value={this.state.about} />
                        <br /> <br /><br />
                        <p><font color="red">{this.state.status}</font>
                        </p>
                        <br /><br />
                        <a href="#close"><button type="reset" class="btn btn-danger" onClick={() => { this.setState({ status: "" }); }}>Cancel</button></a>
                        &nbsp;
                        <button onClick={this.updateAboutButton} class="btn btn-primary">Update</button>
                      </div>
                    </div>
                    <p>
                      <font size="4">{this.state.about} </font>{" "}<a href={ref_about}>{aboutText}</a>
                    </p>
                  </td>
                </tr>
                <tr />
              </table>
            </div>
            <div class="col-md-3">
              <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">
                <p>Credentials and Highlights</p>
                <hr />
                <tr />
                <tr>
                  <td>
                    <div id="employment" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                        <h4>Add employment credential </h4>
                        <br />
                        <br />
                        <div class="form-group row">
                          <div class="col-5">Position</div>
                          <div class="col-7">
                            <input onChange={this.positionChangeHandler} type="text" class="form-control" value={this.state.position} placeholder="position" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">Company/Organisation</div>
                          <div class="col-7">
                            <input onChange={this.companyChangeHandler} type="text" class="form-control" value={this.state.company} placeholder="company/organisation" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">Start Date</div>
                          <div class="col-7">
                            <input onChange={this.startyearChangeHandler} type="date" class="form-control" value={this.state.startyear} placeholder="start year" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">End Dates</div>
                          <div class="col-7">
                            <input onChange={this.endyearChangeHandler} type="date" class="form-control" value={this.state.endyear} placeholder="end year" />
                          </div>
                        </div>
                        <br /><br /><br />
                        <p> <font color="red">{this.state.status}</font></p>
                        <br /> <br /> <br />
                        <a href="#close"> <button type="reset" class="btn btn-danger" onClick={() => { this.setState({ status: "" }); }}>Cancel</button></a>
                        &nbsp;
                        <button onClick={this.updateExperienceButton} class="btn btn-primary">Update</button>
                      </div>
                    </div>
                    <p><a href="#employment"><i class="fas fa-briefcase" /> Add Employment credential</a></p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="education" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                        <h4>Add education credential </h4>
                        <br /><br />
                        <div class="form-group row">
                          <div class="col-5">School</div>
                          <div class="col-7">
                            <input onChange={this.schoolChangeHandler} type="text" class="form-control" value={this.state.school} placeholder="school" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">Degree</div>
                          <div class="col-7">
                            <input onChange={this.educationdegreeChangeHandler} type="text" class="form-control" value={this.state.educationdegree} placeholder="degree" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">Start Date</div>
                          <div class="col-7">
                            <input onChange={this.educationstartChangeHandler} type="date" class="form-control" value={this.state.educationstart} placeholder="start year" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">End Dates</div>
                          <div class="col-7">
                            <input onChange={this.educationendChangeHandler} type="date" class="form-control" value={this.state.educationend} placeholder="end year" />
                          </div>
                        </div>
                        <br /><br />
                        <p><font color="red">{this.state.status}</font></p>
                        <br /> <br />
                        <a href="#close"><button type="reset" class="btn btn-danger" onClick={() => { this.setState({ status: "" }); }}>Cancel</button></a>
                        &nbsp;
                        <button onClick={this.updateEducationButton} class="btn btn-primary">Update</button>
                      </div>
                    </div>
                    <p>
                      <a href="#education"> <i class="fas fa-graduation-cap" /> Add education credential</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="location" class="modalDialog">
                      <div>
                        <a href="#close" title="Close" class="close" onClick={() => { this.setState({ status: "" }); }}>X</a>
                        <h4>Add location credential </h4>
                        <br /><br />
                        <div class="form-group row">
                          <div class="col-5">City</div>
                          <div class="col-7">
                            <input onChange={this.cityChangeHandler} type="text" class="form-control" value={this.state.city} placeholder="city" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">State</div>
                          <div class="col-7">
                            <input onChange={this.stateChangeHandler} type="text" class="form-control" value={this.state.state} placeholder="valid USA state name or abbreviation" />
                          </div>
                        </div>
                        <br />
                        <div class="form-group row">
                          <div class="col-5">Zip code</div>
                          <div class="col-7">
                            <input onChange={this.zipcodeChangeHandler} type="text" class="form-control" value={this.state.zipcode} placeholder="valid USA zipcode" />
                          </div>
                        </div>
                        <br /><br />
                        <p><font color="red">{this.state.status}</font></p>
                        <br /> <br />
                        <a href="#close"><button type="reset" class="btn btn-danger" onClick={() => { this.setState({ status: "" }); }}>Cancel</button></a>
                        &nbsp;
                        <button onClick={this.updateLocationButton} class="btn btn-primary">Update</button>
                      </div>
                    </div>
                    <p><a href="#location"><i class="fas fa-map-marker" /> Add Location credential</a></p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <hr />
          {/* Below part of Screen */}
          <div class="row">

            <div class="col-md-3">
              <h6>Feeds</h6>
              <hr />
              <ul style={{ listStyleType: "none" }} >
                <li><a onClick={() => { this.setState({ feeds: "Profile" }) }} class="a-hover">Profile</a></li>
                <li><a onClick={() => { this.setState({ feeds: "Questions" }) }} class="a-hover">Questions</a></li>
                {/* <li><a href="/questionCard" onClick={() => { this.setState({ feeds: "Answers" }) }} class="a-hover">Answers</a></li> */}
                <li><Link to="/useranswerdisplay" onClick={() => { this.setState({ feeds: "Answers" }) }} class="a-hover">Answers</Link></li>
                <li><a onClick={() => { this.setState({ feeds: "Bookmarks" }) }} class="a-hover">Bookmarks</a></li>
                <li><a onClick={() => { this.setState({ feeds: "Followers" }) }} class="a-hover">Followers</a></li>
                <li><a onClick={() => { this.setState({ feeds: "Following" }) }} class="a-hover">Following</a></li>
              </ul>

            </div>
            <div class="col-md-6">
              <h6>{this.state.feeds}</h6>
              <hr />
            </div>
            <div class="col-md-3">
            </div>
          </div>
          {/* end of Part */}
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
