const mongo = require('./mongo.js');
const login = require('./loginModel.js');
const findTrack = require('./findTrack');

function cleanDb(db) {
  var duplicates = [];
  return new Promise ((resolve, reject) => {
    db.collection('tracks').aggregate([
      { $group: {
        _id: { id: "$id"},
        dups: { "$addToSet": "$_id" },
        count: { "$sum": 1 }
      }},
      { $match: { 
        count: { "$gt": 1 }
      }}
    ],
    {allowDiskUse: true}
    )
    .forEach((doc) => {
        doc.dups.shift();
        doc.dups.forEach((dupId) => {
          duplicates.push(dupId);
        }
      )
    }, () => db.collection('tracks').remove({_id:{$in:duplicates}}, () => resolve('done!')));
  });
}

async function registerUser(object) {
  const db = await mongo;
  const simplePlaylists = await Promise.all(object.playlists.map(async playlist => {
    if (playlist) {
      const tracks = await Promise.all(playlist.tracks.map(async song => {
        const exists = await findTrack(song.id);
        if (!exists.length) {
          await db.collection('tracks').insertOne(song)
        }
        return song.id;
      }));
      return {
        ...playlist,
        tracks: tracks,
      }
    }
  }));
  await cleanDb(db);
  await db.collection('users').insertOne({
    username: object.username,
    name: object.name,
    email: object.email,
    picture: object.picture,
    playlists: simplePlaylists,
    refresh: object.refresh,
    token: object.token,
    adminOf: [],
  });
  return await login(object);
}

module.exports = registerUser;
