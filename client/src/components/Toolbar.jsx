import React, { Component } from "react";
import { Link } from "react-router-dom";

class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <Link
          className="toolbar-button"
          to="/filter"
          onClick={() => this.props.getData()}
        >
          <i className="fas fa-filter"></i>
        </Link>
        <Link to="/add">
          <div className="toolbar-button addSnap">
            <i className="fas fa-camera"></i>
          </div>
        </Link>

        <Link className="toolbar-button" to="/search">
          <i className="fas fa-map-marker"></i>
        </Link>
      </div>
    );
  }
}

export default Toolbar;
