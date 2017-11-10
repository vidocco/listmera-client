const client = require("./redis.js");
const uuid = require("shortid");

//storing data

async function createPlaylist(newPlaylist) {
  const playlistId = uuid.generate();
  const trackId = uuid.generate();
  console.log(unique)
  //store tracks in a separate object with the correct uuid
  let playlist = {
    admin: newPlaylist.username,
    name: newPlaylist.name,
    tracks: trackId,
  };
  client.hmset(`playlist:${playlistId}`, playlist);
  client.hmset(`tracks:${trackId}`)
}

module.exports = createPlaylist;
