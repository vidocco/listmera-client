import React, { Component } from 'react';
import '../stylesheets/components/TopItem.sass';

class TopItem extends Component {

  //========================================= RENDERING
  renderCover(cover) {
      return(
        <div className="topitem_iconwrap">
        {this.props.cover.map(cover => {
          return (
          <img alt='album cover' className="playlist_img_list" src={cover}/>
          )
        })}
        </div>
      )
  }

  render() {
    const cover = this.renderCover(this.props.cover);
    return (
      <div className="top_playlist_item">
        {cover}
        <div className="top_playlist_item_details">
          <h3>{this.props.title}</h3>
          <h4><span>Nº of Songs:</span> {this.props.songs}</h4>
          <h4><span>Filters:</span> {this.props.genres.length ? this.props.genres.join(', ') : 'None'}</h4>
          <h4><span>Duration:</span> {this.props.duration} min</h4>
          <h5><span>Artists you may know:</span> {this.props.artists}</h5>
        </div>
        <div className="play_button"></div>
    </div>
    );
  }
}

export default TopItem;
