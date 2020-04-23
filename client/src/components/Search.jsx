import React, { Component } from "react";

class Search extends Component {
  state = {
    search: ""
  };

  render() {
    return (
      <div className="container">
        <div className="container-header basic-header">
          <h3>Search Location</h3>
        </div>
        <div>
          <p>
            This feature is coming soon. <br /> Stay tuned!
          </p>
          {/* form */}
          {/* <label htmlFor="search">Search location:</label>
          <input type="text" />
          <button>Go</button> */}
        </div>
      </div>
    );
  }
}

export default Search;
