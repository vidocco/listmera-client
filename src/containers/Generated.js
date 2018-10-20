import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from '../actions';
import '../stylesheets/containers/Generated.sass';

class Generated extends Component {

  //========================================= RENDERING

  render() {
    return (
      <div className="generated_wrapper">
          <h1>Playlist generated!</h1>
          <h2>What happens now?</h2>
          <p>Well, your playlist is now in your spotify account and it will be available for
            copying for one hour, meaning that anyone can click on the 'copy' button and it
            will be added to their spotify account.
            After that it will disappear into the vast nothingness of the cyberspace.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Generated);
