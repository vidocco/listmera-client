import React, { Component } from 'react';
import '../App.css';

import Header from '../components/Header';
import Banner from '../components/Banner';
import TopLists from '../components/TopLists';

class Main extends Component {
  constructor(props) {
    super(props);
    fetch('http://localhost:3000/api/playlists/recent')
      .then(res => res.json)
      .then(res => console.log(res))
      .catch(e => console.error(e));
  }

  render() {
    return (
      <div className="Wrapper">
        <Header />
        <Banner />
        {/* <TopLists /> */}
      </div>
    );
  }
}

export default Main;
