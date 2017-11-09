const mongo = require('./mongo.js');

async function findUser(username) {
  const db = await mongo;
  return new Promise((resolve, reject) => {
    db.collection('users')
      .find({username: username})
      .toArray((err, results) => {
        resolve(results);
        reject(err);
      });;
  });
}

module.exports = findUser;