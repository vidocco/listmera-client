import React, { Component } from 'react';
import '../App.css';

import Header from '../components/Header';
import Banner from '../components/Banner';
import TopLists from '../components/TopLists';

class Main extends Component {
  render() {
    return (
      <div className="Wrapper">
        <Header />
        <Banner />
        <TopLists />
      </div>
    );
  }
}

export default Main;
