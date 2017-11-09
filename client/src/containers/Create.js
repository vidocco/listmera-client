import React, { Component } from 'react';
import '../App.css';

import Header from '../components/Header';

class Create extends Component {
  createPlaylist(name) {

  }
  render() {
    return (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          <h1>Create a new playlist</h1>
          <div className="UserForm">
            <div className="LastInput">
              <input placeholder="PLAYLIST NAME" type="text" />
            </div>
          </div>
          <button className="Create" onClick={() => this.createPlaylist()}>CREATE</button>
        </div>
      </div>
    );
  }
}

export default Create;
