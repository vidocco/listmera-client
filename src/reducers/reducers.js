const initialUserState = {
  username: '',
  name: '',
  picture: '',
  playlists: []
}

const reducer = (state = initialUserState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      ...action.user
    }
  case 'SET_PLAYLIST':
    return {
      ...state,
      playlists: [
        ...state.playlists,
        action.playlist.id
      ]
    }
  case 'LOGOUT':
    return initialUserState;
  case 'UNSET_PLAYLIST':
    const play = state.playlists.filter(el => el !== action.playlist);
    return {
      ...state,
      playlists: play,
    }
  case 'ON_SEARCH':
    return {
      ...state,
      playlists: action.playlist
    }
  default: return state;
  }
}

export default reducer;