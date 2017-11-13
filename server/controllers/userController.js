const engine = require('../engine/engine.js');

const locate = require('../models/userModels/findUser.js');
const setAsManager = require('../models/userModels/userPlaylistModel.js');

const display = require('../models/playlistModels/getDisplayPlaylist.js');

module.exports = {
  get: async function (ctx) {
    const user = await locate(ctx.headers.user);
    if (!user[0]) {
      ctx.status = 401;
      return;
    } else {
      user[0].adminOf = await Promise.all(user[0].adminOf.map(async el => await display(el, true)));
      ctx.response.body = user[0];
      ctx.status = 200;
    }
  }
};