const client = require('./redis.js');
const search = require('../spotifyModels/searchTracks.js');
const findUser = require('../userModels/findUser.js');

async function retrieveTrackList(id) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      resolve({bank: reply.bank, tracks: reply.tracks});
    });
  });
}

module.exports = retrieveTrackList;