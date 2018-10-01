import React, { Component } from 'react';

import '../stylesheets/components/Header.sass';
// import search from '../assests/magnifier.svg'


class SearchBar extends Component {

//========================================= RENDERING
  render() {
    return(
      <div className='navbar_wrapper_logotype_name'>
        <input type='text' className='search_bar' />
      </div>
    );
  };
}

export default SearchBar;