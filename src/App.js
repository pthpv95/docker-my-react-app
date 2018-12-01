import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactHookExample } from "./components/Hooks";
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:3000')

class App extends Component {
  state = {};
  componentDidMount() {
    socket.on("connect", () => {
      console.log("connect to server success");
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactHookExample />
      </div>
    );
  }
}

export default App;
