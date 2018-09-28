import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../stylesheets/components/Banner.sass'

class Banner extends Component {

  //========================================= RENDERING
  renderButton(user) {
    if (user) {
      return (
        <Link to="/create">
          <button className="banner_create">LET'S DO THIS!</button>
        </Link>
      )
  } else {
      return (
        <Link to="/access">
          <button className="banner_create">LOGIN TO CREATE</button>
        </Link>
      )
    }
  }

  render() {
    const button = this.renderButton(this.props.user.username)
    return (
      <div className="banner">
        <div className="banner_overlay">
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
