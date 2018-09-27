import React, { Component } from 'react';
import '../stylesheets/components/TopItem.sass';

class TopItem extends Component {

  //========================================= RENDERING

  renderCover(cover) {
    if (Array.isArray(cover)) {
      return (
        <div className="IconWrap">
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[0]}/>
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[1] || require('../assets/music-albums.png')}/>
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[2] || require('../assets/music-albums.png')}/>
          <img alt="album cover" className="PlaylistImg" src={this.props.cover[3] || require('../assets/music-albums.png')}/>
        </div>
      )
    } else {
      return (
        <div className="IconWrap">
          <img alt="album cover" className="PlaylistImg Solo" src={this.props.cover}/>
        </div>
      )
    }
  }

  render() {
    const cover = this.renderCover(this.props.cover);
    return (
      <div className="TopPlaylistItem">
        {cover}
        <div className="PlaylistDetails">
          <h3>{this.props.title}</h3>
          <h4>Nº of Songs: {this.props.songs}</h4>
          <h4>Filters: {this.props.genres.length ? this.props.genres.join(', ') : 'None'}</h4>
          <h4>Duration: {this.props.duration} min</h4>
          <h5>Artists you may know: {this.props.artists}</h5>
        </div>
        <div className="PlayButton"></div>
    </div>
    );
  }
}

export default TopItem;
