import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Question from './Question/Question';
import Inbox from './Inbox/Inbox';
import Feed from './Feed/Feed';
import Notifications from './Notifications/Notifications';
import Profile from './User/Profile';
import Account from './User/Account';
import Dashboard from './User/Dashboard';
import Answered from './User/Answered';
import Followers from './User/Followers';
import QuestionsAsked from './User/QuestionsAsked';
import Following from './User/Following';
import Login from './Login/Login';

class Main extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <a href="home"> <h2 class="text-danger fontQuora">Quora</h2> </a>

          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
              <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <ul class="navbar-nav ml-auto">

            <li class="nav-item dropdown no-arrow d-sm-none">
              <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-search fa-fw"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                <form class="form-inline mr-auto w-100 navbar-search">
                  <div class="input-group">
                    <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="notifications" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell fa-fw"></i>

              </a>

            </li>

            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="inbox" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-envelope fa-fw"></i>

              </a>

            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="login" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">User Name here </span>
                {/* <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/> */}
              </a>
            </li>

          </ul>

        </nav>

        <div class=" top30 ">
          <div class=" column1 leftItems">
            <div class="card" >
              <div class="card-header">
                <i class="fas fa-external-link-square-alt" href="question"></i>
                Feed
              </div>
              <ul class=" small list-group list-group-flush">
                <li class="list-group-item">Food</li>
                <li class="list-group-item">Programming</li>
                <li class="list-group-item">Global News</li>
              </ul>
            </div>
          </div>
          <div class=" column2">
            <div class="container-fluid">

              
              <BrowserRouter>
                <Switch>
                  
                  <Route path="/notifications" component={Notifications} />
                  <Route path="/question" component={Question} />
                  <Route path="/inbox" component={Inbox} />
                  <Route path="/account" component={Account} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/answered" component={Answered} />
                  <Route path="/questionsasked" component={QuestionsAsked} />
                  <Route path="/followers" component={Followers} />
                  <Route path="/following" component={Following} />
                  <Route path="/home" component={Feed} />
                  <Route path="/feed" component={Feed} />
                  <Route path="/login" component={Login} />

                </Switch>
              </BrowserRouter>
            </div>

          </div>
          <div class=" column3 rightItems">
            <div class="card" >
              <div class="card-header" href="feed" >
                <i class="fas fa-external-link-square-alt"></i>

                Feed
              </div>
              <ul class=" small list-group list-group-flush">
                <li class="list-group-item">Food</li>
                <li class="list-group-item">Programming</li>
                <li class="list-group-item">Global News</li>
              </ul>
            </div> </div>
        </div>

      </div>)
  }

}

export default Main;
//connect(null, mapDispatchToProps)(Main)