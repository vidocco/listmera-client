import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/components/TopList.sass';
import TopItem from './TopItem';

class TopLists extends Component {

  //========================================= RENDERING
  formatFilters(playlist) {
    let res = [];
    if (playlist.dance) res.push(playlist.dance);
    if (playlist.energy) res.push(playlist.energy);
    if (playlist.loud) res.push(playlist.loud);
    if (playlist.instrumental) res.push(playlist.instrumental);
    if (playlist.live) res.push(playlist.live);
    if (playlist.mood) res.push(playlist.mood);
    if (playlist.major) res.push(playlist.major);
    if (playlist.minor) res.push(playlist.minor);
    return res;
  }

  renderPlaylists() {
    return this.props.content.map((el, i) => {
      const filters = this.formatFilters(el);
      return (
        <Link key={i} to={`/playlist/${el.id}`}>
          <TopItem cover={el.cover ? el.cover : []}
            title={el.name}
            songs={el.length}
            genres={filters}
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
      <div className="top_playlist_wrap">
          <div className='top_playlist_width'>
            <div className="top_playlist_wrap_title">
              <h1>{this.props.title}</h1>
            </div>
            <div className="top_playlist_list">
              {playlists}
            </div>
          </div>
      </div>
    );
  }
}

export default TopLists;
