const client = require('./redis.js');
const getFeatures = require('../spotifyModels/audioFeatures.js');
const engine = require('../../engine/engine.js');

async function intersect(playlist, collab, collaborator, refresh) {
  return new Promise(async (resolve, reject) => {
    client.sismember(`collabs:${playlist.collabs}`, collaborator, (err, results) => {
      if (err) reject(500);
      if (results) {
      } else {
        client.SINTER(`tracks:${playlist.bank}`, `tracks:${collab}`, async (err, intersect) => {
          let rejected = [];
          if (intersect.length) {
            const filtered = await getFeatures(intersect, refresh);
            const matched = engine.match(filtered.body.audio_features, playlist);
            client.sadd(`tracks:${playlist.tracks}`, matched);
          } if (err) reject(500);
          client.sdiff(`tracks:${collab}`, `tracks:${playlist.bank}`, (err, diff) => {
            if (diff.length) client.sadd(`tracks:${playlist.bank}`, diff);
            client.sadd(`collabs:${playlist.collabs}`, collaborator);
            if (err) reject(500);
            resolve(200);
          });
        });
      }
    });
  });
}

module.exports = intersect;