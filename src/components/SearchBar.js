import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import '../stylesheets/components/Header.sass';

class SearchBar extends Component {

  //========================================= RENDERING
  render() {
    return(
      <div className='navbar_wrapper_logotype_name'>
      <input type='text' className='search_bar' placeholder= 'Search'/>
    </div>
    );
  };
}

export default SearchBar;