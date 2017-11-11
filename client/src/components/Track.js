import React, { Component } from 'react';
import '../App.css';

class Track extends Component {
  render() {
    return (
      <div className="Track">
        <div className="TrackImageWrap">
          <img className="TrackCover" alt="cover" src={this.props.img}/>
        </div>
        <div className="TrackDetails">
          <h3>{(this.props.title.length > 60) ? (this.props.title.slice(0,59) + '...') : this.props.title}</h3>
          <h5>Artist: {
            (this.props.artists.length > 1) 
            ? this.props.artists[0] + ` and ${this.props.artists.length - 1} more`
            : this.props.artists[0]} | Album: {
            (this.props.album.length > 40)
            ? this.props.album.slice(0,39) + '...'
            : this.props.album} | Popularity: {this.props.popularity}</h5>
        </div>
      </div>
    );
  }
}

export default Track;
