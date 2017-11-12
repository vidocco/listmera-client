const mongo = require('./mongo.js');

async function loginUser(data) {
  const db = await mongo;
  return new Promise((resolve, reject) => {
    db.collection('users')
      .find({username: data.username})
      .toArray((err, results) => {
        resolve(results);
        if (err) reject(err);
      });;
  });
}

module.exports = loginUser;