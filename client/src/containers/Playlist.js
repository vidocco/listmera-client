import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { set } from '../actions'

import Header from '../components/Header';

class Playlist extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = '/access';
    }
  }
  render() {
    return (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  set: (playlist) => dispatch(set(playlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
