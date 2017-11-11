const engine = require('../engine/engine.js');

const findUser = require('../models/findUser.js');
const create = require('../models/createPlaylistModel.js');
const setAdmin = require('../models/userPlaylistModel.js');
const get = require('../models/getPlaylistModel.js');
const getFullPlaylist = require('../models/getFullPlaylistModel.js');
const generate = require('../models/spotifyCreate.js');
const setTracks = require('../models/createTrackListModel.js');
const intersect = require('../models/trackIntersectModel.js');
const retrieveTracks = require('../models/retrieveTrackListModel.js');

module.exports = {
  create: async function (ctx) {
    const playlist = JSON.parse(ctx.request.body);
    const user = await findUser(playlist.username);
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
  },
  collab: async function (ctx) {
    const user = await findUser(JSON.parse(ctx.request.body).username);
    const tracks = engine.init(user[0].playlists);
    const trackId = await setTracks(tracks);
    const playlist = await retrieveTracks(ctx.params.id);
    await intersect(playlist, trackId)
      .catch(e => e);
    ctx.status = 200;
  },
  generate: async function (ctx) {
    const user = await findUser(JSON.parse(ctx.request.body).username);
    const playlist = await getFullPlaylist(ctx.params.id);
    if (user.length && user[0].username === playlist.adminId) {
      await generate(playlist, user[0].refresh)
      ctx.status = 200;
    } else if (!playlist.adminId) ctx.status = 400;
    else ctx.status = 401;// console.log(user);
  },
  delete: async function (ctx) {

  }
};