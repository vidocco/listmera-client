const client = require('./redis.js');
const search = require('./spotifySearch.js');
const findUser = require('./findUser.js');

async function retrieveTrackList(id) {
  return new Promise((resolve, reject) => {
    const playlist = {};
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      resolve({bank: reply.bank, tracks: reply.tracks});
    });
  });
}

module.exports = retrieveTrackList;