import React, { Component } from 'react';
import '../App.css';

import { Link } from 'react-router-dom';

class Banner extends Component {
  render() {
    return (
      <div className="Banner">
        <div className="BannerOverlay">
          <h1>Create a combined playlist</h1>
          <Link to="/create">
            <button className="Create">LET'S DO THIS</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Banner;
