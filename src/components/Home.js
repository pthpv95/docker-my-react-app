import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Home = props => {
  return (
    <div>
      <strong>Hello world.</strong>
      <Link to={"/my-work"}>
        <h3>My work</h3>
      </Link>
    </div>
  );
};

export default Home;
