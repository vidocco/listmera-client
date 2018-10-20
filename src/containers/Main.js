import React, { Component } from 'react';
import '../stylesheets/containers/Main.sass';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import TopLists from '../components/TopLists';

class Main extends Component {
  constructor(props) {
    super(props);
    fetch(process.env.REACT_APP_API_URL + '/playlists/recent', {
      headers: {
        Origin: process.env.REACT_APP_CLIENT_URL
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          ...res
        });
      })
      .catch(e => console.error(e));
  }

  //========================================= RENDERING
  renderTopLists(state) {
    if (state) {
      return <TopLists content={this.state.playlists} title="Recently created playlists 🚀" />;
    } else {
      return <Loader />;
    }
  }

  render() {
    const lists = this.renderTopLists(this.state);
    return (
      <div className="wrapper">
        {/* <Header /> */}
        <Banner />
        {lists}
      </div>
    );
  }
}

export default Main;
