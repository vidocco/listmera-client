const client = require("./redis.js");
const uuid = require("shortid");

//storing data

async function saveNewData(newData) {
  let playlist = {
    admin: newPlaylist.username,
    tracks: newPlaylist.tracks,
    // time: Date.now()
  };
  client.hmset(`playlist:${uuid.generate()}`, message);
}

module.exports = saveNewData;
