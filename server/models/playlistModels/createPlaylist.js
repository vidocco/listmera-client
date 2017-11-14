const client = require('./redis.js');
const uuid = require('shortid');

async function createPlaylist(newPlaylist, values) {
  const playlistId = uuid.generate();
  const trackId = uuid.generate();
  const bankId = uuid.generate();
  const collabId = uuid.generate();
  let playlist = {
    admin: newPlaylist.admin,
    name: newPlaylist.name,
    tracks: trackId,
    bank: bankId,
    collabs: collabId,
    ...values,
  };
  await client.hmset(`playlist:${playlistId}`, playlist);
  await client.sadd(`tracks:${bankId}`, newPlaylist.tracks);
  await client.sadd(`collabs:${collabId}`, newPlaylist.admin);
  await client.sadd('recent', playlistId);
  return playlistId;
}

module.exports = createPlaylist;
