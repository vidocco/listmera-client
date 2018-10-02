export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const set = (playlist) => ({
  type: 'SET_PLAYLIST',
  playlist,
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const unset = (playlist) => ({
  type: 'UNSET_PLAYLIST',
  playlist
})

export const onSearch = (playlist) => ({
  type: 'ON_SEARCH',
  playlist
})