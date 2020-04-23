import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/auth/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.props.setUser(response.data);
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({
          message: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="container-header basic-header">
          <h3>Sign Up</h3>
        </div>
        <div className="container-content">
          <form>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              onChange={this.handleChange}
              value={this.state.username}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            {this.state.message && (
              <p className="error-message">{this.state.message}</p>
            )}

            <button
              className="button-visible"
              type="submit"
              onClick={this.handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}
