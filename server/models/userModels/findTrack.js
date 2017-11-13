const mongo = require('./mongo.js');

function findTracks(identifier) {
  return new Promise((resolve, reject) => {
    mongo.then(db => {
      db.collection('tracks')
        .find({id: identifier})
        .toArray((err, results) => {
          resolve(results);
          if (err) reject(err);
      });
    });
  });
}

module.exports = findTracks;