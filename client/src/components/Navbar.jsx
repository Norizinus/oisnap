import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/3a.png";

class Navbar extends Component {
  logout = () => {
    axios
      .get("/auth/logout")
      .then(response => {
        this.props.setUser(null);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          <Link className="navbarHome" to="/home">
            <img className="logo" src={logo} alt="OiSnap-logo" />
          </Link>

          <button>
            <i name="user" className="fas fa-user-circle"></i>
          </button>
        </div>
        {this.props.dropdown && !this.props.user && (
          <div className="dropdown">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        {this.props.dropdown && this.props.user && (
          <div className="dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/home" onClick={this.logout}>
              Logout
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Navbar;
