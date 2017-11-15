const spotify = require('../../secrets/spotifyConf.js');

async function generatePlaylist(playlist, refresh) {
  let playlistId;
  let tracks = playlist.tracks.map(el => `spotify:track:${el}`);
  await spotify.setRefreshToken(refresh);
  await spotify.refreshAccessToken()
    .then(async data => {
      await spotify.setAccessToken(data.body['access_token']);
    })
    .catch(e => console.error(e));
  if (!playlist.strict) {
    let seed;
    let attributes;
    // console.log(Object.keys(playlist));
    if (playlist.tracks.length <= 5) seed = playlist.tracks;
    else seed = playlist.tracks.slice(0,5);
    const keys = [
      'dance',
      'energy',
      'loud',
      'instrumental',
      'live',
      'mood',
      'major',
      'minor',
      'tempo',
    ];
    let flag = false;
    attributes = Object.keys(playlist)
      .filter(el => ~keys.indexOf(el))
      .reduce((acc, el) => {
        if (el === 'dance') {
          return {
            ...acc,
            [`min_danceability`]: Number(playlist[el])
          }
        }
        if (el === 'energy') {
          return {
            ...acc, 
            [`min_energy`]: Number(playlist[el])
          }
        }
        if (el === 'instrumental') {
          return {
            ...acc,
            [`min_instrumentalness`]: Number(playlist[el])
          }
        }
        if (el === 'live') {
          return {
            ...acc,
            [`min_liveness`]: Number(playlist[el])
          }
        }
        if (el === 'loud') {
          return {
            ...acc,
            [`max_loudness`]: Number(playlist[el])
          }
        } 
        if (el === 'tempo') {
          return {
            ...acc,
            [`target_tempo`]: Number(playlist[el])
          }
        }
        if (el === 'mood') {
          return (playlist[el] === 0)
            ? ({
              ...acc,
              [`max_valence`]: 0.5
            })
            : ({
              ...acc,
              [`min_valence`]: 0.5
            });
        }
        if (el === 'minor') {
          if (flag) {
            return {
              ...acc,
              [`target_mode`]: false
            };
          } else {
            flag = true
            return {
              ...acc,
              [`target_mode`]: 0
            };
          }
        }
        if (el === 'major') {
          if (flag) {
            return {
              ...acc,
              [`target_mode`]: false
            };
          } else {
            flag = true
            return {
              ...acc,
              [`target_mode`]: 1
            };
          }
        }
      }, {
        limit: (50-playlist.tracks.length),
        seed_tracks: seed
      });
    let recommended = await spotify.getRecommendations(attributes)
      .then(res => res.body.tracks.map(el => `spotify:track:${el.id}`));
    tracks = tracks.concat(recommended);
  }
  await spotify.createPlaylist(playlist.adminId, playlist.name, {description: 'powered by listmera'})
    .then(res => {
      playlistId = res.body.id;
    })
    .catch(e => console.error(e));
  await spotify.addTracksToPlaylist(playlist.adminId, playlistId, tracks)
    .catch(e => console.error(e));
}

module.exports = generatePlaylist;