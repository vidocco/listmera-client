const engine = require('../engine/engine.js');

//locate a specific User and return it's details.
const locate = require('../models/userModels/findUser.js');
//set a user as the admin user of a specific playlist. Processing function, returns 201 to show it worked correctly.
const setAsManager = require('../models/userModels/userPlaylistModel.js');
//removes a user as the manager for a playlist
const removeAdmin = require('../models/userModels/removeAdmin.js');

//push a playlist in Redis to a users spotify account.
const generate = require('../models/spotifyModels/createPlaylist.js');

//create a playlist on Redis. Returns playlist id in Redis.
const create = require('../models/playlistModels/createPlaylist.js');
//grab a simplified version of a playlist (for display purposes only). Returns a promise that resolves to an object containing details.
const display = require('../models/playlistModels/getDisplayPlaylist.js');
//get all details and tracks for a specific playlist. Returns a promise that resolves to an object containing details.
const get = require('../models/playlistModels/getPlaylistDetails.js');
//creates a short-lived (10 secs) cache of the collaborating users tracks and returns that cache's id.
const set = require('../models/playlistModels/createTrackList.js');
//creates intersection between collaborating users tracks and playlist's tracks. Returns 200 to show it worked correctly.
const intersect = require('../models/playlistModels/intersectTracks.js');
//retrieves all track ids for the specified playlist.
const getTracks = require('../models/playlistModels/retrieveTrackList.js');
//get all recently created playlists
const recent = require('../models/playlistModels/recentPlaylists.js');
//deletes a playlist
const remove = require('../models/playlistModels/deletePlaylist.js');

module.exports = {
  create: async function (ctx) {
    const playlist = JSON.parse(ctx.request.body);
    const user = await locate(playlist.username);
    const trackList = engine.init(user[0].playlists);
    const newPlaylist = await create({
      admin : playlist.username,
      name : playlist.name,
      tracks : trackList,
    });
    ctx.status = await setAsManager({id: newPlaylist, username: playlist.username})
    ctx.response.body = {id : newPlaylist};
  },
  get: async function (ctx) {
    const content = await display(ctx.params.id)
      .catch(e => e);
    if (!content) {
      ctx.response.body = {status: null};
      ctx.status = 404;
    } else {
      ctx.response.body = content;
      ctx.status = 200;
    }
  },
  collab: async function (ctx) {
    const user = await locate(JSON.parse(ctx.request.body).username);
    const tracks = engine.init(user[0].playlists);
    const trackId = await set(tracks);
    const playlist = await getTracks(ctx.params.id);
    ctx.status = await intersect(playlist, trackId, user[0].username)
      .catch(e => console.error(e));
  },
  generate: async function (ctx) {
    const user = await locate(JSON.parse(ctx.request.body).username);
    const playlist = await get(ctx.params.id);
    if (user.length && user[0].username === playlist.adminId) {
      await generate(playlist, user[0].refresh)
      ctx.status = 201;
    } else if (!playlist.adminId) ctx.status = 400;
    else ctx.status = 401;
  },
  delete: async function (ctx) {
    const playlist = await get(ctx.params.id);
    const user = await locate(JSON.parse(ctx.request.body).username);
    if (user.length && user[0].username === playlist.adminId) {
      await remove({
        playlist: ctx.params.id,
        collabs: playlist.collabs,
        bank: playlist.bank,
        tracks: playlist.trackId
      });
      ctx.status = await removeAdmin({
        username: user[0].username,
        id: ctx.params.id
      });
    } else if (!playlist.adminId) ctx.status = 400;
    else ctx.status = 401;
  },
  recent: async function (ctx) {
    ctx.response.body = await recent();
    ctx.status = 200;
  }
};