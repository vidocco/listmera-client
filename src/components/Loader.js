import React, { Component } from 'react';
import '../stylesheets/components/Loader.sass';

class Loader extends Component {
  render() {
    return (
      <div className={`loader ${this.props.small ? 'small' : ''}`}>Loading...</div>
    );
  }
}

export default Loader;
