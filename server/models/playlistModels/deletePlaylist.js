const client = require('./redis.js');
const uuid = require('shortid');

async function createPlaylist(object) {
  await client.del(`playlist:${object.playlist}`, playlist);
  await client.del(`tracks:${object.bank}`, newPlaylist.tracks);
  await client.del(`tracks:${object.tracks}`, newPlaylist.tracks);
  await client.del(`collabs:${object.collabs}`, newPlaylist.admin);
  await client.srem('recent', object.playlist);
  return playlistId;
}

module.exports = createPlaylist;
