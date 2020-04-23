import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import categoryColor from "../styles/snapStyles";

import freeImg from "../images/free.png";
import crowdImg from "../images/crowd.png";
import happeningImg from "../images/happening.png";
import promoImg from "../images/promo.png";

class SnapPreview extends Component {
  state = {
    snap: null,
    message: null,
    categoryImg: ""
  };

  getData = () => {
    const snapId = this.props.id;
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
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getData();
    }
    // console.log("hiiiii", snapId);
  }
  componentDidMount() {
    this.getData();
  }

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
        <div className="preview">
          <div className="snap-box">
            <div
              className="preview-time-box container-header"
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

              <p className="time">{this.getTime(snap)} ago</p>
              <div className="container-header-div"></div>
            </div>
            <div className="container-content">
              <img
                className="snap-img-preview"
                src={snap.image}
                alt={snap.title}
              />
              <div className="details-box">
                <Link className="snap-link" to={`/snaps/${snap._id}`}>
                  <h3>{snap.title}</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SnapPreview;
