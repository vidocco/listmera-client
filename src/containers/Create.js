import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';
import { set } from '../actions'

import Header from '../components/Header';

class Create extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      window.location = '/access';
    }
  }

  state = {
    selected: [],
    class: 'Selected',
  }

  createPlaylist(listName, selectedValues, selectedTempo) {
    fetch(process.env.REACT_APP_API_URL + '/playlist', {
      method: 'POST',
      body: JSON.stringify({username: this.props.user.username, name: listName, values: selectedValues, tempo: selectedTempo}),
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': process.env.REACT_APP_CLIENT_URL,
      },
    }).then(res => res.json())
      .then(res => {
        this.props.set(res)
        window.localStorage.setItem('user', JSON.stringify(this.props.user));
        window.location = `/playlist/${res.id}`
      })
      .catch(e => console.error(e));
  }

  toggleSelection = (ref) => {
    if (this.state.selected.indexOf(ref) >= 0) {
      const newSelection = this.state.selected.filter(el => el !== ref);
      this.setState({
        ...this.state,
        selected: [
          ...newSelection,
        ],
      })
    } else {
      this.setState({
        ...this.state,
        selected: [
          ...this.state.selected,
          ref
        ]
      })
    }
  }

  //========================================= RENDERING

  toggleClass(name) {
    if (this.state.selected.indexOf(name) >= 0) return 'TypeSelector Selected';
    return 'TypeSelector';
  }

  render() {
    return (
      <div className="Wrapper">
        <Header />
        <div className="MaxWidthCreate">
          <h1>Create a new playlist</h1>
          <div className="UserForm">
            <input 
              type="text" 
              ref={el => this.inputName = el || 'Listmera List'}
              placeholder="PLAYLIST NAME"
              />
            <h2>Strict Mode</h2>
            <div className="SelectorWrap">
              <button 
                className={this.toggleClass('Strict')}
                onClick={() => this.toggleSelection('Strict')}>Strict</button>
            </div>
            <h2>Type</h2>
            <div className="SelectorWrap">
              <button 
                className={this.toggleClass('Dance')}
                onClick={() => this.toggleSelection('Dance')}>Danceable</button>
              <button
                className={this.toggleClass('Energy')}
                onClick={() => this.toggleSelection('Energy')}>Energetic</button>
              <button
                className={this.toggleClass('Loud')}
                onClick={() => this.toggleSelection('Loud')}>Loud</button>
              <button
                className={this.toggleClass('Instrument')}
                onClick={() => this.toggleSelection('Instrument')}>Instrumental</button>
            </div>
            <h2>Live music only?</h2>
            <div className="SelectorWrap">
              <button
                className={this.toggleClass('Live')}
                onClick={() => this.toggleSelection('Live')}>Live</button>
            </div>
            <h2>Mood</h2>
            <div className="SelectorWrap">
              <button
                className={this.toggleClass('Happy')}
                onClick={() => this.toggleSelection('Happy')}>Happy</button>
              <button
                className={this.toggleClass('Major')}
                onClick={() => this.toggleSelection('Major')}>Major</button>
              <button
                className={this.toggleClass('Sad')}
                onClick={() => this.toggleSelection('Sad')}>Sad</button>
              <button
                className={this.toggleClass('Minor')}
                onClick={() => this.toggleSelection('Minor')}>Minor</button>
            </div>
            <h2>Tempo</h2>
            <p>If you don't care about the tempo of your playlist don't move this slider.</p>
            <div className="SliderWrap">
              <p>Gary</p>
              <input className="Slider"
                type="range"
                ref={el => this.tempo = el || 50}/>
              <p>Sonic</p>
            </div>
          </div>
          <button className="Create"
            onClick={() => this.createPlaylist(this.inputName.value, this.state.selected, this.tempo.value)}>CREATE</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state,
})

const mapDispatchToProps = (dispatch) => ({
  set: (playlist) => dispatch(set(playlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create);
