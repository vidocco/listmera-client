import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onSearch } from '../actions';


import '../stylesheets/components/Header.sass';


class SearchBar extends Component {

  state = {
    text: ''
  }

  // search = () => {
  //   if (this.state.text.length) {
  //     fetch(process.env.REACT_APP_API_URL + '/playlist/:id')
  //     .then(res => res.json())
  //     .then(res => this.props.searching(res.playlist))
  //   } else {
  //     this.props.searching([])
  //   }
  // }

  // debounce = (callback, str) => {
  //   this.setState({text: str})
  //   if (this.timeout) clearTimeout(this.timeout)
  //   this.timeout = setTimeout(callback, 300)
  // }

//========================================= RENDERING
  render() {
    return(
      <div className='navbar_wrapper_logotype_name'>
        <input
          type='text'
          className='search_bar'
          // value= {this.state.text}
          // onChange={(e) => this.debounce(this.search, e.target.value)}
          // onFocus={() => history.location.pathname !== '/playlist/:id' && history.push('/playlist/:id')}
          // onBlur={() => !this.state.text.length && history.goBack()}
          />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  searching: (playlist) => dispatch(onSearch(playlist))
})

export default connect (null, mapDispatchToProps) (SearchBar);