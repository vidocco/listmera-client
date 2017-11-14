const mongo = require('./mongo.js');
const login = require('./loginModel.js');

async function removeAdmin(object) {
  const db = await mongo;
  console.log('removing');
  await db.collection('users').update(
    { username: object.username },
    { $unset: { adminOf: object.id } });
  return 202;
}

module.exports = removeAdmin;
