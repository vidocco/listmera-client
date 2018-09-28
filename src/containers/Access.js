import React, { Component } from 'react';
// import ReactDom from 'react-dom';

import Header from '../components/Header';
import '../stylesheets/containers/Access.sass';

class Access extends Component {

  redirect() {
    window.location.href = process.env.REACT_APP_API_URL + '/access';
  }

  //============ RENDERING
  render() {
    return (
      <div className='acces_wrapper'>
        <Header />
        <div className='acces_wrapper_info'>
          <h1>Start creating combined playlists today.</h1>
          <h2>Let's make some franken-lists!</h2>
          <button className="create" onClick={this.redirect}>
            Login with Spotify
          </button>
        </div>
      </div>
    );
  }
}

export default Access;