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
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
      .catch(e => console.error(e));
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
    const user = JSON.parse(window.localStorage.getItem('user'));
    const body = {username: user.username};
    fetch(`http://localhost:3000/api${window.location.pathname}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => this.props.unset(window.location.pathname.split('/')[2]))
      .catch(e => console.error(e));
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

  render() {
    let collabed = this.state && (this.state.collabers.indexOf(JSON.parse(window.localStorage.getItem('user')).name) >= 0)
      ? 'Collabed'
      : '';
    let generate = (this.state && this.state.isAdmin)
      ? (
        <div className="PlaylistManage">
          <button className="Create Delete" onClick={this.delete}><img className="DeleteIco"alt="DELETE" src={require('../assets/delete.png')}/></button>
          <button className="Generate" onClick={this.generate}>GENERATE</button>
        </div>
      ) : (<button className={'Collaborate ' + collabed} onClick={this.collaborate}>COLLABORATE</button>);
    let extra = (!this.state || this.state.tracks.length === 0) 
      ? (<p className="MoreSongs">this playlist needs a little help, why not collaborate with it?</p>)
      : (<p className="MoreSongs">{`... making that ${this.state.length} songs total`}</p>);
    let tracks = this.state
      ? this.renderTracks(this.state.tracks)
      : 'waiting';
    let name = this.state
      ? this.state.name
      : 'Pending';
    let admin = this.state
      ? this.state.admin
      : 'admin';
    let collabers = this.state
      ? this.state.collabers.filter(el => el !== admin)
      : 'waiting';
    let loaded = this.state
      ? this.state.loaded
      : false;
    return (
      <div className="Wrapper">
        <Header />
        { loaded ? (
          <div className="MaxWidthCreate">
            <div className="PlaylistTitleWrapper">
              <div className="PlaylistTitle">
                <h1>{name}</h1>
                <p>{'created by ' + admin + ' | with the help of ' + collabers}</p>
              </div>
              {generate}
            </div>
            <div className="TrackWrapper">
              {tracks}
            </div>
            {extra}
          </div>
        ) : (
          <Loader />
        )
        }
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   user: state,
// })

const mapDispatchToProps = (dispatch) => ({
  unset: (playlist) => dispatch(unset(playlist)),
})

export default connect(null, mapDispatchToProps)(Playlist);
