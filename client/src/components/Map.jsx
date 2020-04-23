import React, { Component } from "react";
import MapGL, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl
} from "react-map-gl";
import SnapPreview from "./SnapPreview.jsx";

import history from "../history";
import categoryColor from "../styles/snapStyles.js";

const MAPBOX_TOKEN = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

// const geolocateStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   margin: 10
// };

export default class Map extends Component {
  state = {
    viewport: {
      latitude: 52.520007,
      longitude: 13.404954,
      zoom: 12
    },
    popupInfo: null
  };

  _onViewportChange = viewport => this.setState({ viewport });

  getSnaps = () => {
    let snaps = [];
    if (this.props.snapsData.length !== 0) {
      snaps = this.props.snapsData.map(snap => {
        return {
          _id: snap._id,
          latitude: snap.location.lat,
          longitude: snap.location.lng,
          category: snap.category,
          creationDate: snap.created_at
        };
      });
    }

    return snaps;
  };

  renderPopup = snap => {
    this.setState({
      popupInfo: snap
    });
  };

  closePopup = () => {
    this.setState({
      popupInfo: null
    });
  };

  closeWindows = () => {
    history.push("/home");
    this.setState({
      popupInfo: null
    });
  };

  render() {
    const { viewport } = this.state;

    // const geolocateStyle = {
    //   // float: "left",
    //   // marginTop: "100px",
    //   // padding: "10px"
    // };

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="mapContainer"
        onClick={this.closeWindows}
      >
        <div className="map-controls">
          <div className="geolocation-button">
            <GeolocateControl
              // style={geolocateStyle}
              className="map-geolocateStyle"
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              onViewportChange={viewport => {
                this.setState({ viewport: { ...viewport, zoom: 16 } });
              }}
            />
          </div>

          <div className="geolocation-button">
            <NavigationControl showCompass={false} />
          </div>
        </div>
        {this.getSnaps().map(snap => {
          return (
            <Marker
              key={snap._id}
              latitude={snap.latitude}
              longitude={snap.longitude}
              snapImage={snap.image}
              snapTitle={snap.title}
              snapCreated={snap.created_at}
            >
              <span
                style={{
                  color: categoryColor(snap.category, snap.creationDate)
                }}
              >
                <i
                  className="fas fa-map-marker-alt"
                  onClick={() => this.renderPopup(snap)}
                ></i>
              </span>
            </Marker>
          );
        })}
        {this.state.popupInfo !== null ? (
          <Popup
            anchor="bottom-left"
            latitude={this.state.popupInfo.latitude}
            longitude={this.state.popupInfo.longitude}
            dynamicPosition={false}
            closeButton={false}
            closeOnClick={true}
            style={{
              backgroundColor: `${categoryColor(
                this.state.popupInfo.category,
                this.state.popupInfo.created_at
              )}`
            }}
          >
            <div onClick={this.closePopup}>
              <SnapPreview id={this.state.popupInfo._id} />
            </div>
          </Popup>
        ) : null}
      </MapGL>
    );
  }
}
