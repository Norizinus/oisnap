import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.props.setUser(response.data);
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({
          message: "Incorrect credentials, please try again"
        });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="container-header basic-header">
          <h3>Login</h3>
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

            <button
              className="button-visible"
              type="submit"
              onClick={this.handleSubmit}
            >
              Log in
            </button>
          </form>
          {this.state.message ? (
            <p className="error-message">{this.state.message}</p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  }
}
