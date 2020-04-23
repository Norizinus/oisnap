import React, { Component } from "react";
import axios from "axios";
import categoryColor from "../styles/snapStyles";

import freeImg from "../images/free.png";
import crowdImg from "../images/crowd.png";
import happeningImg from "../images/happening.png";
import promoImg from "../images/promo.png";

class SnapDetail extends Component {
  state = {
    snap: null,
    message: null,
    categoryImg: ""
  };

  componentDidMount() {
    const snapId = this.props.match.params.id;

    axios
      .get(`/snaps/${snapId}`)
      .then(response => {
        let categoryImg = "";
        switch (response.data.category) {
          case "free":
            categoryImg = freeImg;
            break;

          case "promo":
            categoryImg = promoImg;
            break;

          case "crowd":
            categoryImg = crowdImg;
            break;

          case "happening":
            categoryImg = happeningImg;
            break;
        }
        this.setState({
          snap: response.data,
          categoryImg: categoryImg
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.getAttribute("name") === "edit") {
      this.props.history.push(`/snaps/${this.props.match.params.id}/edit`);
    } else if (event.target.getAttribute("name") === "delete") {
      axios
        .delete(`/snaps/${this.props.match.params.id}`)
        .then(response => {
          this.props.refresh();
          this.props.history.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getTime = snap => {
    const currentTime = new Date();
    const snapTime = new Date(snap.created_at);

    let timeDiff = currentTime.getTime() - snapTime.getTime();

    let hours = parseInt(timeDiff / (1000 * 3600));
    let minutes = parseInt(timeDiff / (1000 * 60));

    if (hours > 1) {
      return hours + " hours ";
    } else if (hours === 1) {
      return hours + " hour ";
    } else if (minutes === 1) {
      return minutes + " minute ";
    } else {
      return minutes + " minutes ";
    }
  };

  render() {
    const snap = this.state.snap;

    if (!snap) {
      return <div>LOADING</div>;
    } else {
      return (
        <div className="container">
          <div
            className="container-header"
            style={{
              backgroundColor: categoryColor(
                this.state.snap.category,
                this.state.snap.created_at
              )
            }}
          >
            <img
              className="category-icon"
              src={this.state.categoryImg}
              alt={this.state.category}
            />
            <p className="content-header-text">
              Created {this.getTime(snap)} ago
            </p>
            <div className="content-header-div"></div>
          </div>
          <div className="container-content ">
            <div className="snap-box">
              <div>
                <img className="snap-img" src={snap.image} alt={snap.title} />
              </div>
              <div className="details-box">
                <h2>{snap.title}</h2>
                {snap.description !== "" && <p>{snap.description}</p>}
                {this.props.user._id === snap.user && (
                  <div>
                    <button onClick={this.handleSubmit}>
                      <i name="edit" className="fas fa-pen"></i>
                    </button>
                    <button onClick={this.handleSubmit}>
                      <i name="delete" className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
                <p className="info">
                  <i className="fas fa-map-marker"></i> {snap.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SnapDetail;
