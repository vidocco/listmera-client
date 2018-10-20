import React, { Component } from 'react';
import '../stylesheets/containers/Profile.sass';
import { connect } from 'react-redux';

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

  //========================================= RENDERING
  renderProfile(state) {
    if (state) {
      return (
        <div className='profile'>
          <div className='profile_user'>
            <div className= 'profile_user_info'>
              <img alt="you"
                  className="profile_user_info_img"
                  src={this.props.user.picture} />
            </div>

            <div className='profile_user_info_name'>
              <h5>USER</h5>
              <h3>{this.state.name}</h3>
            </div>
          </div>

          <div className='profile_playlist'>
            <TopLists content={this.state.adminOf}
              title='Your playlists 🎧' />
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
      <div className="wrapper">
        {profile}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Profile);
