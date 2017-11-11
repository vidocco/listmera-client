const spotify = require('../secrets/spotifyConf.js');

async function spotifySearch(playlist, refresh) {
  let playlistId;
  const tracks = playlist.tracks.map(el => `spotify:track:${el}`);
  await spotify.setRefreshToken(refresh);
  await spotify.refreshAccessToken()
    .then(async data => {
      await spotify.setAccessToken(data.body['access_token']);
    })
    .catch(e => console.error(e));
  await spotify.createPlaylist(playlist.adminId, playlist.name, {description: 'powered by listmera'})
    .then(res => {
      playlistId = res.body.id;
    })
    .catch(e => console.log(e));
  await spotify.addTracksToPlaylist(playlist.adminId, playlistId, tracks);
  // console.log('=======================================================')
  // console.log('Token Refreshed for user: ', refresh);
  // console.log('=======================================================')
  // console.log('About to publich playlist: ', playlist);
  // await spotify.getTracks(arr)
  //   .then(res => tracks = res.body.tracks)
  //   .catch(e => console.error(e));
  // return tracks.map(el => ({
  //   image: el.album.images[0].url,
  //   album: el.album.name,
  //   artist: el.album.artists.map(el => el.name),
  //   id: el.id,
  //   name: el.name,
  //   popularity: el.popularity,
  // }));
}

module.exports = spotifySearch;