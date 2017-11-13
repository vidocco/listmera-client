import React, { Component } from 'react';
import '../App.css';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import TopLists from '../components/TopLists';

class Main extends Component {
  constructor(props) {
    super(props);
    fetch('http://localhost:3000/api/playlists/recent')
      .then(res => res.json())
      .then(res => {
        this.setState({
          ...res,
          loaded: true,
        })
      })
      .catch(e => console.error(e));
  }

  render() {
    const loaded = this.state ? this.state.loaded : false;
    return (
      <div className="Wrapper">
        <Header />
        <Banner />
        {loaded ? (
          <TopLists content={this.state.playlists} title="Recently created Playlists"/>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Main;
