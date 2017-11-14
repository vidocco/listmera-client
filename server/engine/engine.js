module.exports = {
  init (playlists) {
    return playlists
      .filter(el => el !== null)
      .map(el => el.tracks)
      .reduce((prev, curr) => prev.concat(curr))
  },
  match (collab, playlist) {
    return playlist
  },
  parse (values, tempo) {
    const res = {};
    if (~values.indexOf('Strict')) {
      res.strict = true;
    } else {
      res.strict = false;
    }
    if (~values.indexOf('Dance')) {
      res.dance = 0.7;
    } else {
      res.dance = 'undefined';
    }
    if (~values.indexOf('Energy')) {
      res.energy = 0.7;
    } else {
      res.energy = 'undefined';
    }
    if (~values.indexOf('Loud')) {
      res.loud = -30;
    } else {
      res.loud = 'undefined';
    }
    if (~values.indexOf('Instrument')) {
      res.instrumental = 0.7;
    } else {
      res.instrumental = 'undefined';
    }
    if (~values.indexOf('Live')) {
      res.live = 0.7;
    } else {
      res.live = 'undefined';
    }
    if (~values.indexOf('Happy') && ~values.indexOf('Sad')) {
      res.mood = 'undefined';
    } else if (~values.indexOf('Happy')) {
      res.mood = true;
    } else if (~values.indexOf('Sad')) {
      res.mood = false;
    } else {
      res.mood = 'undefined';
    }
    if (~values.indexOf('Major')) {
      res.major = 1;
    } else {
      res.major = 'undefined';
    }
    if (~values.indexOf('Minor')) {
      res.minor = 0;
    } else {
      res.minor = 'undefined';
    }
    if (Number(tempo) === 50) {
      console.log('its 50')
      res.tempo = 'undefined'
    } else {
      res.tempo = (1+((tempo-50)/100))*120;
    }
    return res;
  }
}