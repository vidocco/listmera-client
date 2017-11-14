import React, { Component } from 'react';
import '../App.css';

import { Link } from 'react-router-dom';

import TopItem from './TopItem';

class TopLists extends Component {

  //========================================= RENDERING

  renderPlaylists() {
    return this.props.content.map((el, i) => {
      return (
        <Link key={i} style={{ textDecoration: 'none' }} to={`/playlist/${el.id}`}>
          <TopItem cover={el.cover ? el.cover : require('../assets/music-albums.png')}
            title={el.name}
            songs={el.length}
            genres="N/A"
            duration={el.length*3}
            artists="N/A"
          />
        </Link>
      );
    })
  }

  render() {
    const playlists = this.renderPlaylists();
    return (
      <div className="TopPlaylistWrap">
        <div className="MaxWidthList">
          <div className="Title">
            <h1>{this.props.title}</h1>
          </div>
          <div className="TopPlaylistList">
            {playlists}
          </div>
        </div>
      </div>
    );
  }
}

export default TopLists;
