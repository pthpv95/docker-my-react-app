import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactHookExample } from "./components/Hooks";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import ChatApp from "./modules/Chat";

const socket = io("http://localhost:3000");

class App extends Component {
  state = {};
  componentDidMount() {
    socket.on("updateRoomList", roomList => {
      console.log(roomList);
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p> */}
          {/* <ReactHookExample /> */}
          <Route exact path={"/"} component={() => <p>Home</p>} />
          <Route path={"/chat"} component={ChatApp} />
        </div>
      </Router>
    );
  }
}

export default App;
