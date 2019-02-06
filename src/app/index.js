import _ from "lodash";
import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatApp from "../modules/Chat";
import { connect } from "react-redux";
import logo from "../logo.svg";
import Home from "../components/Home";
import { PostList, Post } from "../modules/Posts";
import Login from "../components/Login";

import SocketContext from "../socket-context";

import * as io from "socket.io-client";
import { SOCKET_IO_SERVER_URL } from "../constants";
const socket = io(SOCKET_IO_SERVER_URL);

const About = props => {
  return (
    <div>
      <Link to={"/about"}>
        <strong>About</strong>
      </Link>
    </div>
  );
};

const MyApps = props => {
  return (
    <div>
      <h3>My apps</h3>
      <span>
        <img src={logo} height={"40px"} width={"40px"} />
      </span>
      <ul>
        <li>
          <a href={"/apps/chat"}>
            <strong>Chat app</strong>
          </a>
        </li>
        <li>
          <Link to={"/apps/posts"}>
            <strong>Posts</strong>
          </Link>
        </li>
      </ul>
      <div />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <SocketContext.Provider value={socket}>
        <Router>
          <div className="App">
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/my-work"} component={MyApps} />
            <Route exact path={"/about"} component={About} />
            <Route exact path={"/apps/posts"} component={PostList} />
            <Route path={"/apps/post/:postId"} component={Post} />
            <Route path={"/apps"} component={ChatApp} />
            <Route path={"/login"} component={Login} />
          </div>
        </Router>
      </SocketContext.Provider>
    );
  }
}

export default connect()(App);
