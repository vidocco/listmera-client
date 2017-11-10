const client = require("./redis.js");
const uuid = require("shortid");

async function createPlaylist(newPlaylist) {
  const playlistId = uuid.generate();
  const trackId = uuid.generate();
  let playlist = {
    admin: newPlaylist.admin,
    name: newPlaylist.name,
    tracks: trackId,
  };
  await client.hmset(`playlist:${playlistId}`, playlist);
  await client.sadd(`tracks:${trackId}`, newPlaylist.tracks);
  return playlistId;
}

module.exports = createPlaylist;
