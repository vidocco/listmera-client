const user = {
  username: '',
  name: '',
  picture: '',
}

const reducer = (state = user, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      ...action.user
    }
  default: return state;
  }
}

export default reducer;