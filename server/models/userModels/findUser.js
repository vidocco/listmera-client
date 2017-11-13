const mongo = require('./mongo.js');

async function findUser(id) {
  const db = await mongo;
  return new Promise((resolve, reject) => {
    db.collection('users')
      .find({username: id})
      .toArray((err, results) => {
        resolve(results);
        if (err) reject(err);
      });;
  });
}

module.exports = findUser;