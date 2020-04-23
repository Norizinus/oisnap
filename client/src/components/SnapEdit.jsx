import React, { Component } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import categoryColor from "../styles/snapStyles";
import freeImg from "../images/free.png";
import crowdImg from "../images/crowd.png";
import happeningImg from "../images/happening.png";
import promoImg from "../images/promo.png";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

export default class SnapEdit extends Component {
  state = {
    user: "",
    title: "",
    description: "",
    location: "",
    category: "",
    img: "",
    creationDate: "",
    address: "",
    categoryImg: ""
  };

  getCategoryImg = category => {
    let categoryImg = "";
    switch (category) {
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
    return categoryImg;
  };

  componentDidMount() {
    axios
      .get(`/snaps/${this.props.match.params.id}`)
      .then(response => {
        let categoryImg = this.getCategoryImg(response.data.category);
        this.setState({
          user: response.data.user,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          img: response.data.image,
          creationDate: response.created_at,
          address: response.data.address,
          location: response.data.location,
          categoryImg: categoryImg
        });
      })
      .catch(err => {
        this.setState({
          message: err
        });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    Geocode.fromAddress(this.state.address)
      .then(response => {
        axios
          .patch(`/snaps/${this.props.match.params.id}`, {
            ...this.state,
            address: response.results[0].formatted_address,
            location: response.results[0].geometry.location
          })
          .then(response => {
            this.props.refresh();
            this.props.history.push(`/snaps/${this.props.match.params.id}`);
          })
          .catch(err => console.log(err.message));
      })
      .catch(err => console.log(err));
  };

  assignCategory = event => {
    event.preventDefault();
    let categoryImg = this.getCategoryImg(event.target.value);
    this.setState({
      category: event.target.value,
      categoryImg: categoryImg
    });
  };

  updateLocation = event => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(response => {
      let location = {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      };

      Geocode.fromLatLng(location.lat, location.lng)
        .then(response => {
          this.setState({
            location: location,
            address: response.results[0].formatted_address
          });
        })
        .catch(err => console.log(err));
    });
  };

  render() {
    return (
      <div className="container">
        {this.props.user._id == this.state.user ? (
          <React.Fragment>
            <div
              className="container-header"
              style={{
                backgroundColor: `${categoryColor(
                  this.state.category,
                  this.state.creationDate
                )}`
              }}
            >
              <p>
                <img
                  className="category-icon"
                  src={this.state.categoryImg}
                  alt={this.state.category}
                />
              </p>
              <h3>Edit your Snap</h3>
              <div className="content-header-div"></div>
            </div>
            <div className="container-content">
              {/* <img
                className="snap-img"
                src={this.state.img}
                alt={this.state.title}
                style={{ height: "40vh" }}
              /> */}
              <div className="category-buttons">
                <button
                  className="button-visible category-button category-edit-button"
                  onClick={this.assignCategory}
                  value="free"
                >
                  FREE
                </button>
                <button
                  className="button-visible category-button category-edit-button"
                  onClick={this.assignCategory}
                  value="promo"
                >
                  PROMO
                </button>
                <button
                  className="button-visible category-button category-edit-button"
                  onClick={this.assignCategory}
                  value="crowd"
                >
                  CROWD
                </button>
                <button
                  className="button-visible category-button category-edit-button"
                  onClick={this.assignCategory}
                  value="happening"
                >
                  HAPPENING
                </button>
              </div>
              <p className="info">
                <i>You cannot edit the picture once it was posted.</i>
              </p>
              {/* className="page detail-page" */}
              <div>
                <form className="snap-form">
                  <label htmlFor="title">Snap title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="description"> Short description</label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                  <br />

                  <label htmlFor="address">
                    Location
                    <button onClick={this.updateLocation}>
                      <i className="fas fa-map-marker"></i>
                    </button>
                  </label>

                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                  />

                  <br />
                  <button
                    className="button-visible"
                    onClick={this.handleSubmit}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <p>You need to be the owner of the snap to edit it</p>
        )}
      </div>
    );
  }
}
