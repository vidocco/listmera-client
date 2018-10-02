import React, { Component } from 'react';
import query from 'query-string';

import { connect } from 'react-redux';
import { login } from '../actions';

import Loader from '../components/Loader';
import '../stylesheets/containers/Welcome.sass';

class Welcome extends Component {
  constructor(props) {
    super(props);
    const code = { code: query.parse(window.location.search).code };
    fetch(process.env.REACT_APP_API_URL + '/register', {
      method: 'POST',
      body: JSON.stringify(code),
      mode: 'cors',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_CLIENT_URL
      }
    })
      .then(res => res.json())
      .then(res => {
        res.name = res.name ? res.name : res.username;
        window.localStorage.setItem('user', JSON.stringify(res));
        res.picture = res.picture ? res.picture : require('../assets/compact-disc.svg');
        this.loaded = true;
        this.props.login(res);
      })
      .catch(e => console.error(e));
  }

  //========================================= RENDERING
  render() {
    const user = this.props.user;
    const name = user.name ? user.name : user.username;
    return this.loaded
    ? (
      <div className="acces_wrapper">
        {/* <Header /> */}
        <div className="acces_wrapper_info">
          <h1>Welcome {name}</h1>
          <div className='picture_wrapper'>
            <img alt="you" className="welcome_picture" src={user.picture} />
          </div>
          <h2>We're glad to have you. 🎉</h2>
        </div>
      </div>
    )
    : (
      <div className="wrapper">
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
