const spotify = require('../../secrets/spotifyConf.js');

async function getFeatures(tracks, refresh) {
  await spotify.setRefreshToken(refresh);
  await spotify.refreshAccessToken()
    .then(async data => {
      await spotify.setAccessToken(data.body['access_token']);
    })
    .catch(e => console.error(e));
  return await spotify.getAudioFeaturesForTracks([...tracks]);
}

module.exports = getFeatures;