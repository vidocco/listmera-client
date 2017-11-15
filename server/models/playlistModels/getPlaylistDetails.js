const client = require('./redis.js');
const locate = require('../userModels/findUser.js');

async function getFullPlaylist(id) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    client.hgetall(`playlist:${id}`, async (err, details) => {
      playlist.adminId = details.admin;
      const user = await locate(playlist.adminId);
      playlist.collabs = details.collabs;
      playlist.bank = details.bank;
      playlist.admin = user[0].name;
      playlist.name = details.name;
      playlist.trackId = details.tracks;
      playlist.strict = Number(details.strict);
      if (details.dance) playlist.dance = details.dance;
      if (details.energy) playlist.energy = details.energy;
      if (details.loud) playlist.loud = details.loud;
      if (details.instrumental) playlist.instrumental = details.instrumental;
      if (details.live) playlist.live = details.live;
      if (Number(details.mood)) playlist.mood = Number(details.mood);
      if (Number(details.mood) === 0) playlist.mood = Number(details.mood);
      if (details.major) playlist.major = details.major;
      if (details.minor) playlist.minor = details.minor;
      if (err) reject(err);
      client.smembers(`tracks:${details.tracks}`, async (err, reply) => {
        playlist.tracks = reply;
        resolve(playlist);
        if (err) reject(err);
      })
    });
  });
}

module.exports = getFullPlaylist;