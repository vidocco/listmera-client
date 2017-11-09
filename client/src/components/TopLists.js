import React, { Component } from 'react';
import '../App.css';

import TopItem from './TopItem';

class TopLists extends Component {
  render() {
    return (
      <div className="TopPlaylistWrap">
        <div className="MaxWidthList">
          <div className="Title">
            <h1>Top Playlists for Today</h1>
          </div>
          <div className="TopPlaylistList">
            <TopItem cover="http://vinylcoverart.com/pics/g/bill-frisell-guitar-in-the-space-age-big.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="http://s3.eu-central-1.amazonaws.com/centaur-wp/designweek/prod/content/uploads/2015/11/Blur-The-Magic-Whip-1002x1002.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="https://i.pinimg.com/736x/db/ce/08/dbce089c3027978c17487b4f19746d16--s-album-covers-album-cover-art.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="http://www.holywax-records.com/images/pochettes/nuts.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="http://vinylcoverart.com/pics/g/bill-frisell-guitar-in-the-space-age-big.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="http://s3.eu-central-1.amazonaws.com/centaur-wp/designweek/prod/content/uploads/2015/11/Blur-The-Magic-Whip-1002x1002.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="https://i.pinimg.com/736x/db/ce/08/dbce089c3027978c17487b4f19746d16--s-album-covers-album-cover-art.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="http://www.holywax-records.com/images/pochettes/nuts.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
            <TopItem cover="http://www.holywax-records.com/images/pochettes/nuts.jpg"
              title="Rock & Funk"
              songs="129"
              genres="Rock, Funk, Metal"
              duration="579"
              artists="Loquillo, Metallica" />
          </div>
        </div>
      </div>
    );
  }
}

export default TopLists;
