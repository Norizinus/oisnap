import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/3a.png";

const WelcomePopup = () => {
  return (
    <div className="container">
      <div className="welcomePopup container-content">
        <img className="logo" src={logo} />

        <p>
          OiSnap is a social platform that allows users around Berlin to share
          their best tips of the moment based on location. Share a picture of a
          couch up for grabs on the street, the line to Berghain or an awesome
          street artist – all snaps disappear after 24 hours.
        </p>
        <button className="button-visible">
          <Link className="link" to="/home">
            Explore
          </Link>
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;
