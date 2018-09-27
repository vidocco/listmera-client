import React, { Component } from 'react';
import '../stylesheets/components/Header.sass';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom';

class Header extends Component {

  //========================================= RENDERING

  renderLogin(user) {
    if (!user.name) {
      return (
        <Link to="/access">
          <p>login</p>
        </Link>
      );
    } else {
      return (
        <div className="ProfileSample">
          <Link style={{ textDecoration: 'none' }} to="/me">
            <p>{this.props.user.name.split(' ')[0]}</p>
          </Link>
          <div className="ProfilePicWrapper">
            <img alt="yourpic" className="ProfilePic" src={this.props.user.picture}/>
          </div>
        </div>
      );
    }
  }

  render() {
    const login = this.renderLogin(this.props.user);
    return (
        <nav className="NavBar">
          <div className="MaxWidth">
            <div className="Logotype">
              <div className="LogoWrap">
                <Link to="/">
                    <img alt="logo" className="Logo" src={require('../assets/listmera.png')}/>
                </Link>
              </div>
              <h1>Listmera</h1>
            </div>
            {login}
          </div>
        </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Header);
