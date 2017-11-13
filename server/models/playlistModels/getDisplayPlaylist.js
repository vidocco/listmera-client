const client = require('./redis.js');
const search = require('../userModels/findTrack.js');
const locate = require('../userModels/findUser.js');

async function getPlaylist(id, simple) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    playlist.id = id;
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      playlist.adminId = reply.admin;
      const user = await locate(playlist.adminId);
      playlist.admin = user[0].name;
      playlist.name = reply.name;
      client.smembers(`tracks:${reply.tracks}`, async (err, reply) => {
        playlist.length = reply.length;
        playlist.tracks = await Promise.all(reply.map(async el => await search(el)));
        playlist.tracks = playlist.tracks.length ? playlist.tracks.reduce((prev, curr) => prev.concat(curr)) : [];
        resolve(playlist);
        if (err) reject(err);
      })
    });
  });
}

module.exports = getPlaylist;