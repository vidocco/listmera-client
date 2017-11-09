import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { connect } from 'react-redux';
import { login } from './actions';

import './App.css';

import Main from './containers/Main';
import Access from './containers/Access';
import Welcome from './containers/Welcome';
import Create from './containers/Create';
// import SignUp from './SignUp';

class App extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) this.props.login(user);
  }
  render() {
    return (
      <Router>
        <div className="Wrapper">
          <Route exact path="/" component={Main} />
          <Route path="/create" component={Create} />
          <Route path="/access" component={Access} />
          <Route path="/welcome" component={Welcome} />
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