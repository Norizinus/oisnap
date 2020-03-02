import React, { Component } from "react";
import MapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import SnapPreview from "./SnapPreview.jsx";

const MAPBOX_TOKEN = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10
};

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

  // onGeolocate = () => map.fitBoundsOptions({ maxZoom: 15 });

  getSnaps = () => {
    let snaps = [];
    if (this.props.snapsData.length !== 0) {
      snaps = this.props.snapsData.map(snap => {
        return {
          _id: snap._id,
          latitude: parseFloat(snap.location.split(", ")[0]),
          longitude: parseFloat(snap.location.split(", ")[1])
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

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="mapContainer"
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          fitBoundsOptions={{ maxZoom: 3 }}
        />

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
              <img
                className="marker"
                alt="marker"
                src={require("../images/mapbox-icon.png")}
                onClick={() => this.renderPopup(snap)}
              />
            </Marker>
          );
        })}
        {this.state.popupInfo !== null ? (
          <Popup
            anchor="bottom-left"
            latitude={this.state.popupInfo.latitude}
            longitude={this.state.popupInfo.longitude}
            dynamicPosition={true}
            closeButton={false}
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
