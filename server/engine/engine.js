module.exports = {
  init (playlists) {
    return playlists
      .filter(el => el !== null)
      .map(el => el.tracks)
      .reduce((prev, curr) => prev.concat(curr))
  },
  match (collab, playlist) {
    return playlist
  }
}