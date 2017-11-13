const client = require('./redis.js');
const display = require('./getDisplayPlaylist');

async function getPlaylist() {
  return new Promise((resolve, reject) => {
    client.smembers('recent', async (err, reply) => {
      if(err) reject(err);
      const playlists = await Promise.all(reply.map(async el => {
        return await display(el, true);
      }));
      resolve({playlists: playlists});
    })
  });
}

module.exports = getPlaylist;