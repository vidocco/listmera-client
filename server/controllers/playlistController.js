const create = require('../models/createPlaylistModel.js');
const engine = require('../engine/engine.js');
const findUser = require('../models/findUser.js');

module.exports = {
  create: async function (ctx) {
    const playlist = JSON.parse(ctx.request.body);
    const user = await findUser(playlist.username);
    const tracks = engine.init(user[0].playlists);
    //store playlist with a reference to tracks
    await create({
      admin: playlist.username,
      name: playlist.name,
      tracks: tracks,
    });
    console.log('inserted');
    ctx.status = 200;
  }
};