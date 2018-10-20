import React, { Component } from 'react';
import '../stylesheets/containers/Playlist.sass';
import '../stylesheets/components/Loader.sass';

import { connect } from 'react-redux';
import { unset } from '../actions';
import Loader from '../components/Loader';
import Track from '../components/Track';

class Playlist extends Component {
  constructor(props) {
    super(props);
    fetch(process.env.REACT_APP_API_URL + window.location.pathname, {
      Origin: process.env.REACT_APP_CLIENT_URL
    })
      .then(res => {
        if (res.status === 404) return false;
        return res.json();
      })
      .then(res => {
        if (!res) this.setState({ deleted: true });
        if (
          window.localStorage.getItem('user') &&
          JSON.parse(window.localStorage.getItem('user')).username === res.adminId
        ) {
          this.setState({
            ...res,
            isAdmin: true,
            loaded: true
          });
        } else {
          this.setState({
            ...res,
            loaded: true
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  // Collaborate to someone else playlist.
  collaborate() {
    fetch(process.env.REACT_APP_API_URL + window.location.pathname, {
      method: 'PUT',
      body: window.localStorage.getItem('user'),
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_CLIENT_URL
      }
    })
      .then(res => {
        if (res.status === 200) window.location.reload();
      })
      .catch(e => console.error(e));
  }

  // Generate playlists to Spotify. If there are no tracks it cannot generate them.
  // I'M NOT SURE THIS IS CORRECTLY WORKING...
  generate = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    let user = JSON.parse(window.localStorage.getItem('user'));
    if(this.state.length) {
    fetch(process.env.REACT_APP_API_URL + window.location.pathname, {
      method: 'POST',
      body: window.localStorage.getItem('user'),
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_CLIENT_URL
      }
    })
      .then(res => (window.location = '/generated'))
      .catch(e => console.error(e));

    } else {
      window.confirm(
        `Hey ${user.name.split(' ')[0]}, your playlist is empty. Please tell your friends to collaborate.`
      );
    }
  };

  // 'Post' the tracks into the Listmera playlist
  copy = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    const body = {
      ...JSON.parse(window.localStorage.getItem('user')),
      copy: true
    };
    fetch(process.env.REACT_APP_API_URL + window.location.pathname, {
      method: 'POST',
      body: JSON.stringify(body),
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_CLIENT_URL
      }
    })
      .then(res => (window.location = '/generated'))
      .catch(e => console.error(e));
  };

  // As the name says, it deletes playlists.
  delete = () => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    const sure = window.confirm(
      `Hey ${user.name.split(' ')[0]}, are you sure you want to delete this playlist?`
    );
    if (sure) {
      const body = { username: user.username };
      fetch(process.env.REACT_APP_API_URL + window.location.pathname, {
        method: 'DELETE',
        body: JSON.stringify(body),
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: process.env.REACT_APP_CLIENT_URL
        }
      })
        .then(res => {
          const track = window.location.pathname.split('/')[2];
          const newPlaylists = user.playlists.filter(el => el !== track);
          user = {
            ...user,
            playlists: newPlaylists
          };
          window.localStorage.setItem('user', JSON.stringify(user));
          this.props.unset(track);
          window.location = '/';
        })
        .catch(e => console.error(e));
    }
  };

  //========================================= RENDERING
  renderTracks(tracks) {
    return tracks.map((el, i) => {
      return <Track key={i}
        img={el.image}
        title={el.name}
        artists={el.artists}
        album={el.album}
        popularity={el.popularity}/>
    })
  }

  renderButtons = state => {
    let buttonClass;
    if (JSON.parse(window.localStorage.getItem('user')) === null) {
      buttonClass = 'Collabed';
    } else {
      buttonClass =
        state.collabers.indexOf(JSON.parse(window.localStorage.getItem('user')).name) >= 0
          ? 'Collabed'
          : '';
    }
    if (state.isAdmin) {
      const text = state.loading ? (
          <div>Loading...</div>

      ) : (
        'GENERATE'
      );
      const color = state.loading ? 'generate clicked' : 'generate';
      return state.done ? (
        <div className="playlist_manage">
          <button className="generate clicked inactive_button">DONE</button>
        </div>
      ) : (
        <div className="playlist_manage">
          <button className="Create delete" onClick={this.delete}>
            <img className="delete_img" alt="DELETE" src={require('../assets/garbage.svg')} />
          </button>
          <button className={color} onClick={this.generate}>
            {text}
          </button>
        </div>
      );
    } else {
      const text = state.loading ? (
        <img alt="LOADING" className="loader" src={require('../assets/circle.png')} />
      ) : (
        'COPY'
      );
      const color = state.loading ? 'generate clicked' : 'generate';
      return state.done ? (
        <button className={color} onClick={this.copy}>
          {text}
        </button>
      ) : (
        <button className={'collaborate ' + buttonClass} onClick={this.collaborate}>
          COLLABORATE
        </button>
      );
    }
  };

  renderContent = state => {
    if (state) {
      if (state.deleted) {
        return (
          <div className="Error">
            <h1>This playlist no longer exists</h1>
            <p>(or maybe it never did)</p>
            <p className="EasterEgg">[insert spooky theremin sound here]</p>
          </div>
        );
      } else {
        const buttons = this.renderButtons(state);
        const tracks = this.renderTracks(state.tracks);
        const name = state.name ? state.name : 'Listmera playlist 🙈';
        const admin = state.admin ? state.admin.split(' ')[0] : 'N/A';
        const collabers =
          state.collabers.filter(el => el !== admin).length > 0
            ? ` with the help of ${state.collabers
                .map(el => (el !== null ? el.split(' ')[0] : null))
                .filter(el => (el !== null && el !== admin ? true : false))
                .join(', ')}`
            : ' and in need of collaborators';
        const extra =
          state.tracks.length === 0 ? (
            <p className="more_songs">
              This playlist needs a little help. Come on, click that button!
            </p>
          ) : (
            <p className="more_songs">{`... making that ${this.state.length} songs in total`}</p>
          );
        return (
          <div className="render_content">
            <div className="render_content_title">
              <div className="playlist_title">
                <h1>{name}</h1>
                <p>{'created by ' + admin + collabers}</p>
              </div>
              {buttons}
            </div>
            <div className="TrackWrapper">{tracks}</div>
            {extra}
          </div>
        );
      }
    } else {
      return <Loader />;
    }
  };

  render() {
    const content = this.renderContent(this.state);
    return (
      <div className="wrapper">
        {content}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  unset: playlist => dispatch(unset(playlist))
});

export default connect(null, mapDispatchToProps)(Playlist);
