import React, { Component } from 'react';
import '../Loader.css';

class Loader extends Component {
  render() {
    return (
      <div className="LoaderWrap">
        <img className="Loader" src={require('../assets/loading.png')} alt="loading..."/>
      </div>
    );
  }
}

export default Loader;
