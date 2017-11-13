const client = require('./redis.js');
const display = require('./getDisplayPlaylist');

async function getPlaylist() {
  return new Promise((resolve, reject) => {
    client.smembers('recent', async (err, reply) => {
      if(err) reject(err);
      if(!reply.length) resolve({playlists: []});
      let playlists = await Promise.all(reply.map(async el => {
        return await display(el, true);
      }));
      playlists = playlists.map(el => {
        if (el.tracks.length) {
          const coverImg = el.tracks.reduce((acc,el) => {
            if (acc.length < 4) {
              acc.push({image: el.image, popularity: el.popularity});
              return acc.sort((a,b) => b.popularity - a.popularity);
            } else if (el.popularity > acc[3].popularity) {
              acc = [
                ...acc.slice(0,3),
                {image: el.image, popularity: el.popularity}
              ];
              return acc.sort((a,b) => b.popularity - a.popularity);
            } else return acc;  
          }, []).map(el => el.image);
          return {
            ...el,
            cover: coverImg,
          };
        } else {
          return el;
        }
      });
      resolve({playlists: playlists});
    })
  });
}

module.exports = getPlaylist;