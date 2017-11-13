import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { set } from '../actions'

import Header from '../components/Header';

class Create extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = '/access';
    }
  }
  createPlaylist(name) {
    fetch('http://localhost:3000/api/playlist', {
      method: 'POST',
      body: JSON.stringify({username: this.props.user.username, name: name}),
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        this.props.set(res)
        window.localStorage.setItem('user', JSON.stringify(this.props.user));
        window.location = `/playlist/${res.id}`
      })
      .catch(e => console.error(e));
  }
  render() {
    return (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          <h1>Create a new playlist</h1>
          <div className="UserForm">
            <div className="LastInput">
              <input 
                type="text" 
                ref={el => this.inputName = el}
                placeholder="PLAYLIST NAME"
                />
            </div>
          </div>
          <button className="Create"
            onClick={() => this.createPlaylist(this.inputName.value)}>CREATE</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  set: (playlist) => dispatch(set(playlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create);
