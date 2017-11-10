const engine = require('../engine/engine.js');
const create = require('../models/createPlaylistModel.js');
const setAdmin = require('../models/userPlaylistModel.js');
const get = require('../models/getPlaylistModel.js');
const findUser = require('../models/findUser.js');

module.exports = {
  create: async function (ctx) {
    const playlist = JSON.parse(ctx.request.body);
    console.log(playlist);
    const user = await findUser(playlist.username);
    console.log(playlist.username);
    const finalTracks = engine.init(user[0].playlists);
    const newPlaylist = await create({
      admin: playlist.username,
      name: playlist.name,
      tracks: finalTracks,
    });
    setAdmin({id: newPlaylist, username: playlist.username})
    ctx.response.body = {id : newPlaylist};
    ctx.status = 200;
  },
  get: async function (ctx) {
    const content = await get(ctx.params.id);
    ctx.response.body = content;
    ctx.status = 200;
  }
};