export const login = (user) => ({
  type: 'LOGIN',
  user
})

export const set = (playlist) => ({
  type: 'SET_PLAYLIST',
  playlist,
})