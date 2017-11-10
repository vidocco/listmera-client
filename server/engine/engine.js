module.exports = {
  init (playlists) {
    // console.log(playlists)
    return playlists.filter(el => el !== null).map(el => el.tracks);
  }
}