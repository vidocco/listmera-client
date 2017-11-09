const mongo = require('./mongo.js');

async function getTopics() {
  const db = await mongo;
  return new Promise((resolve, reject) => {
    db.collection('users')
      .find()
      .toArray((err, results) => {
        resolve(results);
        reject(err);
      });;
  });
}

module.exports = getTopics;