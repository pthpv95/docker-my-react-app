import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatApp from "../modules/Chat";
import { connect } from "react-redux";
import { getOnlineRoomChat } from "./actions";
import logo from "../logo.svg";
import { SOCKET_IO_SERVER_URL } from "../constants";

import SocketContext from "../socket-context";
import * as io from "socket.io-client";

const socket = io(SOCKET_IO_SERVER_URL);

const Home = props => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          {/* Welcome to my showcases. This is the place that I'm gonna put
              everything I learn things related to React . */}
          React playgrounds
        </h1>
      </header>
      <h3>Hello world!</h3>
      <Link to={"/apps"}>
        <strong>My apps</strong>
      </Link>
    </div>
  );
};

const MyApps = props => {
  return (
    <div>
      <h3>My apps</h3>
      <Link to={"/apps/chat"}>
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
            <Route path={"/apps"} component={MyApps} />
            <Route path={"/apps/chat"} component={ChatApp} />
          </div>
        </Router>
      </SocketContext.Provider>
    );
  }
}

export default connect()(App);
