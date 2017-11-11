//contains basic spotify setup
const spotify = require('../secrets/spotifyConf.js');
//pushes user through authentication and login process via spotify and returns all the users details.
const register = require('../models/spotifyModels/getAuth.js');

const scopes = ['user-read-private', 'user-read-email'];
const state = 'prov-state';

module.exports = {
  auth: async function (ctx) {
    ctx.redirect(spotify.createAuthorizeURL(scopes, state))
  },
  register: async function (ctx) {
    const code = JSON.parse(ctx.request.body).code;
    const user = await register(code);
    ctx.response.body = {
      name: user[0].name,
      username: user[0].username,
      picture: user[0].picture,
      playlists: user[0].adminOf,
    }
    ctx.status = 200;
  }
};