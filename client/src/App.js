import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import history from "./history";

import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";
import Map from "./components/Map";
import Toolbar from "./components/Toolbar";
import Search from "./components/Search";
import Filter from "./components/Filter";
import NewSnap from "./components/NewSnap";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SnapDetail from "./components/SnapDetail";

import Footer from "./components/Footer";

import SnapPreview from "./components/SnapPreview";
import SnapEdit from "./components/SnapEdit";

class App extends React.Component {
  state = {
    user: this.props.user,
    data: [],
    dropdown: false
  };

  setDropdown = event => {
    console.log(event.target.innerText);
    if (event.target.innerText === "User") {
      this.setState({
        dropdown: !this.state.dropdown
      });
    } else {
      this.setState({
        dropdown: false
      });
    }
  };

  setUser = userObj => {
    this.setState({ user: userObj });
  };

  getData = () => {
    axios
      .get("/snaps")
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <div className="App" onClick={this.setDropdown}>
        <Router history={history}>
          <div className="map">
            <Map snapsData={this.state.data} />
          </div>
          <div className="body">
            <Navbar
              user={this.state.user}
              setUser={this.setUser}
              dropdown={this.state.dropdown}
              setDropdown={this.setDropdown}
            />
            <div className="body-view">
              <Switch>
                <Route exact path="/search" component={Search} />
                <Route exact path="/filter" component={Filter} />
                <Route
                  exact
                  path="/add"
                  render={props => (
                    <NewSnap
                      user={this.state.user}
                      refresh={this.getData}
                      history={props.history}
                    />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={props => (
                    <Signup setUser={this.setUser} history={props.history} />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={props => (
                    <Login setUser={this.setUser} history={props.history} />
                  )}
                />
                <Route
                  exact
                  path="/profile"
                  render={props => (
                    <Profile user={this.state.user} history={props.history} />
                  )}
                />
                <Route
                  exact
                  path="/snaps/:id/edit"
                  render={props => (
                    <SnapEdit user={this.state.user} {...props} />
                  )}
                />
                <Route
                  path="/snaps/:id"
                  render={props => (
                    <SnapDetail {...props} user={this.state.user} />
                  )}
                />

                <Route
                  path="/snaps/:id/preview"
                  render={props => (
                    <SnapPreview {...props} user={this.state.user} />
                  )}
                />

                <Route exact path="/" component={WelcomePopup} />
              </Switch>
            </div>
            <Switch>
              <Route exact path="/" component={Footer} />
              <Toolbar snapsdata={this.state.data} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
