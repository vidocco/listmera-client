import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '../stylesheets/components/Header.sass';
import SearchBar from '../components/SearchBar';
import Dropdown from '../containers/Dropdown';
import logo from '../assets/listmera.png';

class Header extends Component {

  redirect() {
    window.location.href = process.env.REACT_APP_API_URL + '/access';
  }

//========================================= RENDERING
  renderLogin(user) {
    if (!user.name) {
      return (
        <div className='header_profile_login'>
          <div className='header_profile_login_text'
                onClick={this.redirect}>LOG IN</div>
        </div>
      );
    } else {
      return (
        <div className='header_profile'>
          <div className='header_profile_img_wrapper'>
            <img alt="Your pic"
                className="header_profile_img"
                src={this.props.user.picture} />
          </div>

          <div className='header_profile_name_wrapper'>
              <div className='header_profile_name'>
                {this.props.user.name}
              </div>
          <div className='dropdown_menu'><Dropdown /></div>
          </div>
        </div>
      );
    }
  }

  render() {
    const login = this.renderLogin(this.props.user);
    return (
      <div className='navbar'>
        <div className='navbar_search'>
          <div className='navbar_logotype'>
            <Link to="/">
              <div className='navbar_logotype_img_wrapper'>
                <img alt="logo"
                    className="navbar_wrapper_logotype_img"
                    src={logo} />
              </div>
            </Link>
          </div>
          <SearchBar />
        </div>

        <div className='navbar_right'>
          <div className='navbar_login'>
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
