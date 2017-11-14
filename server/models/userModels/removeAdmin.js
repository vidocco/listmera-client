const mongo = require('./mongo.js');
const locate = require('./findUser.js');

async function removeAdmin(object) {
  const db = await mongo;
  const user = await locate(object.username);
  console.log(user);
  const lists = user[0].adminOf.filter(el => el !== object.id);
  await db.collection('users').update(
    { username: object.username },
    { $set: { adminOf: lists } });
  return 202;
}

module.exports = removeAdmin;
