const client = require('./redis.js');

async function retrieveTrackList(id) {
  return new Promise((resolve, reject) => {
    client.hgetall(`playlist:${id}`, async (err, reply) => {
      resolve({bank: reply.bank, tracks: reply.tracks, collabs: reply.collabs});
      if (err) reject(err);
    });
  });
}

module.exports = retrieveTrackList;