const client = require('./redis.js');
const uuid = require('shortid');

async function createPlaylist(tracks) {
  const trackId = uuid.generate();
  await client.sadd(`tracks:${trackId}`, tracks);
  await client.expireat(`tracks:${trackId}`, parseInt((+new Date)/1000) + 10);
  return trackId;
}

module.exports = createPlaylist;