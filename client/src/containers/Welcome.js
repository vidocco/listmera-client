import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import query from 'query-string';

import { connect } from 'react-redux';
import { login } from '../actions';

import Header from '../components/Header';
import Loader from '../components/Loader';
import '../App.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    const code = {code: query.parse(window.location.search).code};
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: JSON.stringify(code),
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        res.name = res.name ? res.name : res.username;
        window.localStorage.setItem('user', JSON.stringify(res));
        res.picture = res.picture ? res.picture : require('../assets/music-player.png');
        this.loaded = true;
        this.props.login(res);
      })
      .catch(e => console.log(e));
    }
    
    componentWillMount() {
    }
  //============ RENDERING

  render() {
    console.log(this.state)
    const user = this.props.user;
    const name = user.name ? user.name : user.username;
    return this.loaded ? (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          <h1>Welcome {name}</h1>
          <img alt="you" className="WelcomePicture" src={user.picture}/>
          <h2>We're glad to have you</h2>
        </div>
      </div>
    ) : (
      <div className="Wrapper">
        <Loader />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
