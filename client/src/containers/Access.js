import React, { Component } from 'react';
// import ReactDom from 'react-dom';

import Header from '../components/Header';
import '../App.css';

class Access extends Component {

  redirect() {
    window.location.href = 'http://localhost:3000/api/access';
  }

  //============ RENDERING

  render() {
    return (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          <h1>Start creating combined playlists today</h1>
          <div className="Welcome">
            <h2 className="Subtitle">Let's make some franken-lists!</h2>
            <button className="Create" onClick={this.redirect}>login with spotify</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Access;