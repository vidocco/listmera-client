import React, { Component } from 'react';
import '../stylesheets/components/Loader.sass';

class Loader extends Component {
  render() {
    return (
      // <div className="loader_wrap">
      //   <img className="Loader" src={require('../assets/loading.png')} alt="loading..."/>
      // </div>
      <div class="loader">Loading...</div>
    );
  }
}

export default Loader;
