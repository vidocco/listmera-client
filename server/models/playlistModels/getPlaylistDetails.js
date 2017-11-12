const client = require('./redis.js');
const locate = require('../userModels/findUser.js');

async function getFullPlaylist(id) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      playlist.adminId = reply.admin;
      const user = await locate(playlist.adminId);
      playlist.admin = user[0].name;
      playlist.name = reply.name;
      if (err) reject(err);
      client.smembers(`tracks:${reply.tracks}`, async (err, reply) => {
        playlist.tracks = reply;
        resolve(playlist);
        if (err) reject(err);
      })
    });
  });
}

module.exports = getFullPlaylist;