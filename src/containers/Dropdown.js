import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';


import '../stylesheets/containers/Dropdown.sass';

class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    }
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  logout = () => {
    window.localStorage.removeItem('user');
    this.props.logout();
    window.location = '/';
  };

// ==================== RENDERING
  render() {
    return (
      <div className='dropdown_outter'>
        <div className='dropdown' onClick={this.showDropdownMenu}>
        ▾
        </div>
        { this.state.displayMenu
        ? (
          <div className='dropdown_list'>
            <Link to="/me">
              <li>Profile</li>
            </Link>
            <li onClick={this.logout}>Log Out</li>
          </div>
          )
        : (null)
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Dropdown);
