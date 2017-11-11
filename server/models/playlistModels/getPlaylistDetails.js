const client = require('./redis.js');
const search = require('../spotifyModels/searchTracks.js');
const findUser = require('../userModels/findUser.js');

async function getFullPlaylist(id) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      playlist.adminId = reply.admin;
      const user = await findUser(playlist.adminId);
      playlist.admin = user[0].name;
      playlist.name = reply.name;
      client.smembers(`tracks:${reply.tracks}`, async (err, reply) => {
        playlist.tracks = reply;
        resolve(playlist);
      })
    });
  });
}

module.exports = getFullPlaylist;