const mongo = require('./mongo.js');
const login = require('./loginModel.js');

async function registerUser(object) {
  const db = await mongo;
  await db.collection('users').insertOne({
    username: object.username,
    name: object.name,
    email: object.email,
    picture: object.picture,
    playlists: object.playlists,
    refresh: object.refresh,
    token: object.token,
  });
  return await login(object);
}

module.exports = registerUser;
