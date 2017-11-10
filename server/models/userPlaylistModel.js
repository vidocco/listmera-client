const mongo = require('./mongo.js');
const login = require('./loginModel.js');

async function setPlaylistAdmin(object) {
  const db = await mongo;
  await db.collection('users').update(
    { username: object.username },
    { $push: { adminOf: object.id } });
}

module.exports = setPlaylistAdmin;
