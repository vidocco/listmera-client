const client = require('./redis.js');
const search = require('../spotifyModels/searchTracks.js');
const locate = require('../userModels/findUser.js');

async function getPlaylist(id) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      playlist.adminId = reply.admin;
      const user = await locate(playlist.adminId);
      playlist.admin = user[0].name;
      playlist.name = reply.name;
      client.smembers(`tracks:${reply.tracks}`, async (err, reply) => {
        playlist.length = reply.length;
        playlist.tracks = await search(reply.slice(0, 50), user[0].refresh);
        resolve(playlist);
        if (err) reject(err);
      })
    });
  });
}

module.exports = getPlaylist;