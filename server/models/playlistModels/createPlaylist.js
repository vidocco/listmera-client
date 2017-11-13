const client = require('./redis.js');
const uuid = require('shortid');

async function createPlaylist(newPlaylist) {
  const playlistId = uuid.generate();
  const trackId = uuid.generate();
  const bankId = uuid.generate();
  let playlist = {
    admin: newPlaylist.admin,
    name: newPlaylist.name,
    tracks: trackId,
    bank: bankId,
  };
  await client.hmset(`playlist:${playlistId}`, playlist);
  await client.sadd(`tracks:${bankId}`, newPlaylist.tracks);
  await client.sadd('recent', playlistId);
  return playlistId;
}

module.exports = createPlaylist;
