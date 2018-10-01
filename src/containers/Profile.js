import React, { Component } from 'react';
import '../stylesheets/containers/Profile.sass';

import { connect } from 'react-redux';
import { logout } from '../actions';

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
        Origin: process.env.REACT_APP_CLIENT_URL
      });
      fetch(process.env.REACT_APP_API_URL + '/me', {
        method: 'GET',
        headers: headers
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            ...res,
            loaded: true
          });
        })
        .catch(e => console.error(e));
    }
  }

  logout = () => {
    window.localStorage.removeItem('user');
    this.props.logout();
    window.location = '/';
  };

  //========================================= RENDERING
  renderProfile(state) {
    if (state) {
      return (
        <div>
          <div className='profile'>
            <div className='profile_img'>
              <img alt="you" className="welcome_picture" src={this.state.picture} />
            </div>

            <div className='profile_info'>
              <h5>USER</h5>
              <h3>{this.state.name}</h3>
              <div className='profile_info_logout'>
                <button onClick={this.logout}>Log Out</button>
              </div>
            </div>
          </div>

          <div className='toplist'>
            <TopLists content={this.state.adminOf} title="Your playlists 🎧" />
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }

  render() {
    const profile = this.renderProfile(this.state);
    return (
      <div className="Wrapper">
        {profile}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Profile);
