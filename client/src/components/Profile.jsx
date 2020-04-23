import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
  state = {
    snapData: [],
    score: null,
    isMouseInside: false,
    isMouseInsideId: ""
  };

  getData = () => {
    axios
      .get(`/snaps?user=${this.props.user._id}`)
      .then(response => {
        this.setState({
          snapData: response.data.snapList,
          score: response.data.score
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push("/login");
    }
    this.getData();
  };

  handleSubmit = (event, id) => {
    event.preventDefault();

    if (event.target.getAttribute("name") === "edit") {
      this.props.history.push(`/snaps/${id}/edit`);
    } else if (event.target.getAttribute("name") === "delete") {
      axios
        .delete(`/snaps/${id}`)
        .then(response => {
          this.props.refresh();
          this.getData();
        })
        .catch(err => {});
    }
  };

  mouseEnter = (event, id) => {
    this.setState({ isMouseInside: true, isMouseInsideId: id });
    return event.target.getAttribute("title");
  };
  mouseLeave = () => {
    this.setState({ isMouseInside: false, isMouseInsideId: false });
  };

  render() {
    return (
      <div className="container">
        <div className="container-header basic-header">
          <div className="user">
            <i
              name="user"
              className="fas fa-user-circle"
              style={{ color: "white" }}
            ></i>
          </div>
          <h3 className="username"> {this.props.user.username}'s Profile</h3>

          <p className="user-score">
            <i className="fas fa-star"></i> Snap score <i>{this.state.score}</i>
          </p>
        </div>

        <h4>Your current snaps</h4>
        <div
          className="container-content profile-body"
          style={{ paddingTop: "0" }}
        >
          <div className="user-snaps">
            {this.state.snapData?.map(snap => {
              return (
                <div className="user-snap" id={snap._id} key={snap._id}>
                  <div className="snap-info">
                    <div
                      className="image-vs-buttons"
                      onMouseEnter={event => this.mouseEnter(event, snap._id)}
                      onMouseLeave={event => this.mouseLeave(event, snap._id)}
                    >
                      <img
                        title={snap.title}
                        className="snap-img-preview-profile"
                        src={snap.image}
                        alt={snap.title}
                      />
                      {this.state.isMouseInsideId === snap._id ? (
                        <React.Fragment>
                          <div className="snap-edit">
                            <button
                              className="action-button"
                              title={snap.title}
                              onClick={event =>
                                this.handleSubmit(event, snap._id)
                              }
                            >
                              <i name="edit" className="fas fa-pen"></i>
                            </button>
                            <br></br>
                            <button
                              className="action-button"
                              title={snap.title}
                              onClick={event =>
                                this.handleSubmit(event, snap._id)
                              }
                            >
                              <i name="delete" className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                          <div className="image-vs-buttons-overlay"></div>
                        </React.Fragment>
                      ) : (
                        <></>
                      )}
                    </div>

                    <Link className="snap-link" to={`/snaps/${snap._id}`}>
                      {snap.title}
                    </Link>
                  </div>
                </div>
              );
            })}
            {this.state.snapData.length === 0 && (
              <p>
                Nothing here yet... <br /> Time to{" "}
                <Link to="/add">post a snap!</Link>{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
