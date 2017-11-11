const client = require('./redis.js');

async function intersect(playlist, collabId) {
  return new Promise((resolve, reject) => {
    client.SINTER(`tracks:${playlist.bank}`, `tracks:${collabId}`, (err, intersect) => {
      if (intersect.length) client.sadd(`tracks:${playlist.tracks}`, intersect);
      reject(err);
      client.sdiff(`tracks:${collabId}`, `tracks:${playlist.bank}`, (err, diff) => {
        if (diff.length) client.sadd(`tracks:${playlist.bank}`, diff);
        reject(err);
      });
    });
  });
  resolve(200);
}

module.exports = intersect;