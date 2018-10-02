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

  title() {
    if (!this.props.title) {
      return (<div className='listmera_playlist'>Listmera Playlist <span role='img' aria-label='Monkey'>🙈</span></div>)
    } else {
      return (<h3>{this.props.title}</h3>)
    }
  }

  render() {
    const cover = this.renderCover(this.props.cover);
    const title = this.title(this.props.title)
    return (
      <div className="top_playlist_item">
        {cover}
        <div className="top_playlist_item_details">
          {/* <h3>{this.props.title}</h3> */}
          {title}
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
