const user = {
  username: '',
  name: '',
  picture: '',
  playlists: []
}

const reducer = (state = user, action) => {
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
  default: return state;
  }
}

export default reducer;