const spotify = require('../../secrets/spotifyConf.js');

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
    .catch(e => console.error(e));
  await spotify.addTracksToPlaylist(playlist.adminId, playlistId, tracks)
    .catch(e => console.error(e));
}

module.exports = spotifySearch;