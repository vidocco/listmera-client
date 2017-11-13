import React, { Component } from 'react';
import '../App.css';

class TopItem extends Component {
  render() {
    return (
      <div className="TopPlaylistItem">
        <div className="IconWrap">
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[0]}/>
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[1]}/>
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[2]}/>
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[3]}/>
        </div>
        <div className="PlaylistDetails">
          <h3>{this.props.title}</h3>
          <h4>Nº of Songs: {this.props.songs}</h4>
          <h4>Genres: {this.props.genres}</h4>
          <h4>Duration: {this.props.duration} min</h4>
          <h5>Artists you may know: {this.props.artists}</h5>
        </div>
        <div className="PlayButton"></div>
    </div>
    );
  }
}

export default TopItem;
