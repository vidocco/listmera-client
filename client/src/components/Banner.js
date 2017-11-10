import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class Banner extends Component {
  render() {
    const link = this.props.user.username 
    ? (
      <Link to="/create">
        <button className="Create">LET'S DO THIS</button>
      </Link>
    ) : (
      <Link to="/access">
        <button className="Create">LOGIN TO CREATE</button>
      </Link>
    )
    return (
      <div className="Banner">
        <div className="BannerOverlay">
          <h1>Create a combined playlist</h1>
          {link}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Banner);
