import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class Banner extends Component {

  //========================================= RENDERING

  renderButton(user) {
    if (user) {
      return (
        <Link to="/create">
          <button className="Create">LET'S DO THIS</button>
        </Link>
      )
    } else {
      return (
        <Link to="/access">
          <button className="Create">LOGIN TO CREATE</button>
        </Link>
      )
    }
  }

  render() {
    const button = this.renderButton(this.props.user.username)
    return (
      <div className="Banner">
        <div className="BannerOverlay">
          <h1>Create a combined playlist</h1>
          {button}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Banner);
