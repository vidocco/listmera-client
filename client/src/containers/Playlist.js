import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { unset } from '../actions'

import Header from '../components/Header';
import Loader from '../components/Loader';
import Track from '../components/Track';

class Playlist extends Component {
  constructor(props) {
    super(props);
    fetch(`http://localhost:3000/api${window.location.pathname}`)
      .then(res => {
        if (res.status === 404) return false;
        return res.json()
      })
      .then(res => {
        if (!res) this.setState({deleted: true});
        if (window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user')).username === res.adminId) {
          this.setState({
            ...res,
            isAdmin: true,
            loaded: true,
          });
        } else {
          this.setState({
            ...res,
            loaded: true,
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  collaborate () {
    fetch(`http://localhost:3000/api${window.location.pathname}`, {
      method: 'PUT',
      body: window.localStorage.getItem('user'),
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.status === 200) window.location.reload();
    })
      .catch(e => console.error(e));
  }

  generate () {
    fetch(`http://localhost:3000/api${window.location.pathname}`, {
      method: 'POST',
      body: window.localStorage.getItem('user'),
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => console.log(res))
      .catch(e => console.error(e));
  }

  delete = () => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    const sure = window.confirm(`Hey ${user.name.split(' ')[0]}, are you sure you want to delete this playlist?`);
    if (sure) {
      const body = {username: user.username};
      fetch(`http://localhost:3000/api${window.location.pathname}`, {
        method: 'DELETE',
        body: JSON.stringify(body),
        mode: 'cors',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => {
        const track = window.location.pathname.split('/')[2];
        const newPlaylists = user.playlists.filter(el => el !== track)
        user = {
          ...user,
          playlists: newPlaylists,
        }
        window.localStorage.setItem('user', JSON.stringify(user));
        this.props.unset(track)
        window.location = '/';
      })
        .catch(e => console.error(e));
    }
  }

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

  renderButtons(state) {
    const buttonClass = state.collabers.indexOf(JSON.parse(window.localStorage.getItem('user')).name) >= 0 
    ? 'Collabed'
    : '';
    if (state.isAdmin) {
      return (
        <div className="PlaylistManage">
          <button className="Create Delete" onClick={this.delete}><img className="DeleteIco"alt="DELETE" src={require('../assets/delete.png')}/></button>
          <button className="Generate" onClick={this.generate}>GENERATE</button>
        </div>
      )
    } else {
      return (
        <button className={'Collaborate ' + buttonClass} onClick={this.collaborate}>COLLABORATE</button>
      );
    }
  }

  renderContent = (state) => {
    if (state) {
      if (state.deleted) {
        return (
          <div className="Error">
            <h1>This playlist no longer exists</h1>
            <p>(or maybe it never did)</p>
            <p className="EasterEgg">[insert spooky theremin sound here]</p>
          </div>
        )
      } else {
        const buttons = this.renderButtons(state);
        const tracks = this.renderTracks(state.tracks);
        const name = state.name;
        const admin = state.admin;
        const collabers = (state.collabers.filter(el => el !== admin).length > 0)
        ? ` | with the help of ${state.collabers.filter(el => el !== admin)}`
        : ' and in need of collaborators';
        const extra = (state.tracks.length === 0)
        ? (<p className="MoreSongs">this playlist needs a little help. Come on, click that button!</p>)
        : (<p className="MoreSongs">{`... making that ${this.state.length} songs in total`}</p>);
        return (
          <div className="MaxWidthCreate">
            <div className="PlaylistTitleWrapper">
              <div className="PlaylistTitle">
                <h1>{name}</h1>
                <p>{'created by ' + admin + collabers}</p>
              </div>
              {buttons}
            </div>
            <div className="TrackWrapper">
              {tracks}
            </div>
            {extra}
        </div>
        )
      }
    } else {
      return <Loader />
    }
  }

  render() {
    const content = this.renderContent(this.state);
    return (
      <div className="Wrapper">
        <Header />
        {content}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  unset: (playlist) => dispatch(unset(playlist)),
})

export default connect(null, mapDispatchToProps)(Playlist);
