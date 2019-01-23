import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatApp from "../modules/Chat";
import { connect } from "react-redux";
import logo from "../logo.svg";
import { SOCKET_IO_SERVER_URL } from "../constants";

import SocketContext from "../socket-context";
import * as io from "socket.io-client";
import Home from "../components/Home";

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
      <Link to={"/apps/chat"}>
        <img src={logo} height={"40px"} width={"40px"} />
        <strong>Chat app</strong>
      </Link>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <SocketContext.Provider value={socket}>
        <Router>
          <div className="App">
            <p className="App-intro" />
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/my-work"} component={MyApps} />
            <Route path={"/apps"} component={ChatApp} />
          </div>
        </Router>
      </SocketContext.Provider>
    );
  }
}

export default connect()(App);
