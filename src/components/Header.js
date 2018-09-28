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
        <div className='header_profile'>
          <Link to="/access">
            <p className='header_profile_name'>LOG IN</p>
          </Link>
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
            <Link to="/me">
              <div className='header_profile_name'>
                {this.props.user.name.split(' ')[0]}
              </div>
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    const login = this.renderLogin(this.props.user);
    return (
      <div className='navbar'>
        <div className='navbar_logotype'>
          <Link to="/">
            <div className='navbar_logotype_img_wrapper'>
              <img alt="logo"
                  className="navbar_wrapper_logotype_img"
                  src={logo} />
            </div>
          </Link>

            <div className='navbar_wrapper_logotype_name'>
              Listmera
            </div>


        </div>


        <div className='navbar_login'>
          {login}
        </div>
      </div>
        // <div className="navbar">
        //   <div className="navbar_wrapper">
        //     <div className="navbar_wrapper_logotypeinfo">
        //       <div className="navbar_wrapper_logotypeinfo_wrapper">
        //         <Link to="/">
        //           <img alt="logo" className="navbar_wrapper_logotypeinfo_img" src={logo} />
        //         </Link>
        //         <div className='navbar_wrapper_logotypeinfo_name'>Listmera</div>
        //       </div>
        //     </div>

        //     <div className='navbar_wrapper_logotypeinfo_login'>
        //       {login}
        //     </div>
        //   </div>
        // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

export default connect(mapStateToProps, null)(Header);
