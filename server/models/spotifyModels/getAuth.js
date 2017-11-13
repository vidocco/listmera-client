const spotify = require('../../secrets/spotifyConf.js');

const locate = require('../userModels/findUser.js');

const register = require('../userModels/registerModel.js');
const login = require('../userModels/loginModel.js');

async function spotifyRegister(code) {
  const newUser = {};
  let flag = false;
  await spotify.authorizationCodeGrant(code)
  .then(async res => {
    await spotify.setAccessToken(res.body['access_token']);
    await spotify.setRefreshToken(res.body['refresh_token']);
    newUser.token = res.body['access_token'];
    newUser.refresh = res.body['refresh_token'];
  });
  await spotify.getMe()
    .then(async res => {
      const exist = await locate(res.body.id);
      if (exist.length > 0) flag = true;
      if (res.body['images'][0]) newUser.picture = res.body['images'][0].url;
      else newUser.picture = undefined;
      newUser.email = res.body.email;
      newUser.username = res.body.id;
      newUser.name = res.body.display_name;
    }).catch(e => console.error(e));
  if (flag) return login(newUser);
  else {
    await spotify.getUserPlaylists(newUser.username, {limit: 50})
      .then(async res => {
        let completePlaylists = await Promise.all(res.body.items.map(async el => {
          let mappedTracks;
          await spotify.getPlaylistTracks(newUser.username, el.id)
            .then(res => {
              mappedTracks = res.body.items.map(el => {
                return {
                  id: el.track.id,
                  name: el.track.name ? el.track.name : 'Unknown',
                  mature: el.track.explicit ? el.track.explicit : false,
                  popularity: el.track.popularity ? el.track.popularity : 0,
                  artists: el.track.artists.length > 1 ? 'Various Artists' : el.track.artists[0].name || 'Unknown',
                  image: el.track.album.images[0].url ? el.track.album.images[0].url : undefined,
                  album: el.track.album.name ? el.track.album.name : 'Unknown',
                }
              });
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