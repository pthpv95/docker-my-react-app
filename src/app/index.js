import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import ChatApp from "../modules/Chat";
import { connect } from "react-redux";
import { getOnlineRoomChat } from "./actions";
import logo from "../logo.svg";
import { SOCKET_IO_SERVER_URL } from "../constants";

const socket = io(SOCKET_IO_SERVER_URL);

const Home = props => {
  return (
    <div>
      <h3>Hello world!</h3>
      <Link to={"/apps"}>
        <strong>My apps</strong>
      </Link>
    </div>
  );
};
class App extends Component {
  state = {};
  componentDidMount() {
    socket.on("updateRoomList", roomList => {
      this.props.dispatch(getOnlineRoomChat(roomList));
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              Welcome to my showcases. This is the place that I'm gonna put
              everything I learn things related to React .
            </h1>
          </header>

          <p className="App-intro" />
          <Route exact path={"/"} component={Home} />
          <Route path={"/chat"} component={ChatApp} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { chat } = state;
  return {
    chat
  };
};

export default connect(mapStateToProps)(App);
