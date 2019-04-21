import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//you may wanna copy this file for componenets
class Question extends Component {
    constructor() {
        super();

        this.state = {
            showAnswerFormFlag: false,
        }
    }

    componentDidMount() { //IMPORTANT YOU can access redux state only in the componentDidMount
        // console.log("login value is"+this.props.loginValue)
    }

    showAnswerForm = () => {
        console.log("hit");
        var current = this.state.showAnswerFormFlag
        this.setState({ showAnswerFormFlag: !current })

    }

    render() {

        let redirectVar = null;

        return (
            <div>

                <div class="card " >
                    <div class="card-header">
                        <h5 class="font-bold fontQuora">If the U.S had to remove one state which would you want it to be, and why?</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">

                            <div class="text-secondary">
                                <a onClick={() => { this.showAnswerForm() }}   >Answer.</a>  <a>Follow</a>
                                <div style={{ display: (this.state.showAnswerFormFlag ? 'block' : 'none') }}>


                                    <form onSubmit={this.submit_AnnouncementForm}>

                                        <div class="form-group row">
                                            <div class="col-sm-10">
                                                <textarea rows="10" cols="30" onChange={this.body_ChangeHandler} class="form-control" id="ans" required />
                                            </div>
                                        </div>
                                        <input type="submit" class="btn dii btn-primary"></input>
                                    </form>

                                </div>


                            </div>
                        </li>
                        <li class="list-group-item">
                            <span>
                                <i class="fas fa-user"></i>

                                &nbsp; Damien Filiatrault, Founder and CEO at Scalable Path (2010-present) </span><br />
                            <span class=" text-secondary text-right">Answered Aug 20, 2018 </span>
                        </li>
                        <li class="list-group-item">
                            <div class=" card-body fontQuora">
                                <h5>                    There are two options for finding and hiring freelancers. The first is through a referral, which is a great way to hire for any job. Good freelancers usually know other good freelancers, and the word usually spreads. It’s also easier to tap into inactive job seekers who may join your company with the encouragement of a friend or a trusted networking contact. This and the hiring process is also usually much faster!
                                </h5>

                                <div class=" text-secondary">
                                    20 upvotes &nbsp;
                    <i class="fas fa-arrow-circle-up"></i><a>Upvote.</a> <i class="fas fa-arrow-circle-down"></i> <a>Downvote</a>

                                </div>
                            </div></li>
                    </ul>
                </div>

            </div>

        )
    }
}


//export this Component
export default Question;
