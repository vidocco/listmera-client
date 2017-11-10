const mongo = require('./mongo.js');
const spotify = require('../secrets/spotifyConf.js');

const findUser = require('./findUser.js');
const register = require('./registerModel.js');
const loginUser = require('./loginModel.js');

const scopes = ['user-read-private', 'user-read-email'];
const state = 'prov-state';

async function spotifyRegister(code) {
  const db = await mongo;
  const newUser = {};
  let login = false;
  await spotify.authorizationCodeGrant(code)
  .then(async res => {
    await spotify.setAccessToken(res.body['access_token']);
    await spotify.setRefreshToken(res.body['refresh_token']);
    newUser.token = res.body['access_token'];
    newUser.refresh = res.body['refresh_token'];
  });
  await spotify.getMe()
    .then(async res => {
      const exist = await findUser(res.body.id);
      if (exist.length > 0) login = true;
      if (res.body['images'][0]) newUser.picture = res.body['images'][0].url;
      else newUser.picture = undefined;
      newUser.email = res.body.email;
      newUser.username = res.body.id;
      newUser.name = res.body.display_name;
    }).catch(e => console.error(e));
  if (login) return loginUser(newUser);
  else {
    await spotify.getUserPlaylists(newUser.username, {limit: 50})
      .then(async res => {
        let completePlaylists = await Promise.all(res.body.items.map(async el => {
          let mappedTracks;
          await spotify.getPlaylistTracks(newUser.username, el.id)
            .then(res => {
              mappedTracks = res.body.items.map(el => ({
                id: el.track.id,
                name: el.track.name,
                mature: el.track.explicit,
                popularity: el.track.popularity,
                artists: el.track.artists,
              }));
            })
            .catch(e => mappedTracks = false);
          if (mappedTracks) return {id: el.id, name: el.name, tracks: mappedTracks};
        })).catch(e => console.error(e));
        newUser.playlists = completePlaylists;
      });
  }
  return await register(newUser);
}

module.exports = spotifyRegister;