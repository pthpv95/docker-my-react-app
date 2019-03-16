import React, { Component } from "react";
import { withRouter } from "react-router";

class Navbar extends Component {
  state = {
    isToggle: false
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <span className="navbar-toggle" id="js-navbar-toggle" onClick={()=>this.setState({isToggle:!this.state.isToggle})}>
            <i className="fas fa-bars" />
          </span>
          <a className="logo" onClick={() => this.props.history.push("/")}>
            (.)(.)
          </a>
          <ul
            className={`main-nav ${this.state.isToggle ? 'active': ''}`}
            id="js-menu"
            onClick={e => {
              e.preventDefault();
              this.props.history.push(`/${e.target.id.replace("nav-", "")}`);
            }}
          >
            <li>
              <a href="#" className="nav-links" id="">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-links" id="nav-posts">
                Posts
              </a>
            </li>
            <li>
              <a href="#" className="nav-links" id="nav-chat">
                Chat
              </a>
            </li>
            <li>
              <a href="#" className="nav-links" id="nav-about">
                About me
              </a>
            </li>
            {/* <li>
              <a href="#" className="nav-links">
                Contact Us
              </a>
            </li> */}
            <li>
              <a className="nav-links" id="nav-login">
                Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
