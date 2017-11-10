module.exports = {
  init (playlists) {
    // console.log(playlists)
    return playlists
      .filter(el => el !== null)
      .map(el => el.tracks)
      .reduce((prev, curr) => prev.concat(curr))
      .map(el => el.id);
  }
}