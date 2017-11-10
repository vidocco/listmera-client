import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom';

class Header extends Component {
  delete() {
    window.localStorage.removeItem('user');
  }

  render() {
    console.log(this.props.user);
    const login = !this.props.user.name
    ? <Link to="/access">
        <p>login</p>
      </Link>
    : <div className="ProfileSample">
        <p>{this.props.user.name.split(' ')[0]}</p>
        <div className="ProfilePicWrapper">
          <img alt="yourpic" className="ProfilePic" src={this.props.user.picture}/>
        </div>
      </div>;
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
              <button onClick={this.delete}>x</button>
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
