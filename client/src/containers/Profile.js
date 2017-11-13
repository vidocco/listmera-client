import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { logout } from '../actions'

import Header from '../components/Header';
import Loader from '../components/Loader';
import TopLists from '../components/TopLists';

class Profile extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = '/access';
    } else {
      const headers = new Headers({
        User: user.username,
      })
      fetch('http://localhost:3000/api/me', {
        method: 'GET',
        headers: headers
      }).then(res => res.json())
        .then(res => {
          this.setState({
            ...res,
            loaded: true,
          });
        })
        .catch(e => console.error(e));
    }
  }

  logout = () => {
    window.localStorage.removeItem('user');
    this.props.logout();
    window.location = '/';
  }

  render() {
    const loaded = this.state ? this.state.loaded : false;
    return (
      <div className="Wrapper">
        <Header />
        { loaded ? (
          <div className="MaxWidthCreate">
            <div className="ProfileWrapper">
              <div className="ProfileImage">
                <img alt="you" className="WelcomePicture" src={this.state.picture}/>
              </div>
              <div className="ProfileDetails">
                <h3>Name: {this.state.name}</h3>
                <h3>e-mail: {this.state.email}</h3>
                <h3>Username: {this.state.username}</h3>
                <a onClick={this.logout}><p>log out</p></a>
              </div>
            </div>
            <TopLists content={this.state.adminOf} title="Your Playlists"/>
          </div>
        ) : (
          <Loader />
        )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(Profile);
