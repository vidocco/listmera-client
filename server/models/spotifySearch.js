const spotify = require('../secrets/spotifyConf.js');
const mongo = require('./mongo.js');

async function spotifySearch(arr, refresh) {
  if (!arr.length) return [];
  await spotify.setRefreshToken(refresh);
  await spotify.refreshAccessToken()
    .then(async data => {
      await spotify.setAccessToken(data.body['access_token']);
    })
    .catch(e => console.error(e));
  let tracks = [];
  await spotify.getTracks(arr)
    .then(res => tracks = res.body.tracks)
    .catch(e => console.error(e));
  return tracks.map(el => ({
    image: el.album.images[0].url,
    album: el.album.name,
    artist: el.album.artists.map(el => el.name),
    id: el.id,
    name: el.name,
    popularity: el.popularity,
  }));
}

module.exports = spotifySearch;