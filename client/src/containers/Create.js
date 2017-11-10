import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

import Header from '../components/Header';

class Create extends Component {
  createPlaylist(name) {
    fetch('http://localhost:3000/api/create', {
      method: 'POST',
      body: JSON.stringify({username: this.props.user.username, name: name}),
      mode: 'cors',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch(e => console.log(e));
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

// const mapDispatchToProps = (dispatch) => ({
//   login: (user) => dispatch(login(user)),
// })

export default connect(mapStateToProps, null)(Create);
