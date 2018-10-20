import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { connect } from 'react-redux';
import { login } from './actions';

import './App.sass';

import Main from './containers/Main';
import Access from './containers/Access';
import Welcome from './containers/Welcome';
import Create from './containers/Create';
import Playlist from './containers/Playlist';
import Profile from './containers/Profile';
import Generated from './containers/Generated';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      user.picture = user.picture ? user.picture : require('./assets/compact-disc.svg');
      this.props.login(user);
    }
  }

  render() {
    return (
      <Router>
        <div className="app_wrapper">
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/create" component={Create} />
          <Route path="/access" component={Access} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/me" component={Profile} />
          <Route path="/playlist/:id" component={Playlist} />
          <Route path="/generated" component={Generated} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);