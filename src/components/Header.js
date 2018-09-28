import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '../stylesheets/components/Header.sass';
import logo from '../assets/listmera.png';

class Header extends Component {

  //========================================= RENDERING

  renderLogin(user) {
    if (!user.name) {
      return (
        <div className='header_profilesample'>
          <Link to="/access">
            <p className='header_profilesample_name'>LOG IN</p>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="header_profilesample">
          <div className="header_profilesample_profilepicwrapper">
            <img alt="Your pic" className="header_profilesample_profilepicwrapper_profilepic" src={this.props.user.picture}/>
          </div>
          <Link to="/me">
            <p className='header_profilesample_name'>{this.props.user.name.split(' ')[0]}</p>
          </Link>
        </div>
      );
    }
  }

  render() {
    const login = this.renderLogin(this.props.user);
    return (
        <div className="navbar">
          <div className="navbar_wrapper">
            <div className="navbar_wrapper_logotypeinfo">
              <div className="navbar_wrapper_logotypeinfo_wrapper">
                <Link to="/">
                  <img alt="logo" className="navbar_wrapper_logotypeinfo_wrapper_logo" src={logo} />
                </Link>
                <div className='navbar_wrapper_logotypeinfo_wrapper_name'>Listmera</div>
              </div>
            </div>

            <div className='navbar_wrapper_logotypeinfo_login'>
              {login}
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Header);
