const client = require('./redis.js');
const uuid = require('shortid');

async function expire(object) {
  await client.expireat(`playlist:${object.playlist}`, parseInt((+new Date)/1000) + 10);
  await client.expireat(`tracks:${object.bank}`, parseInt((+new Date)/1000) + 10);
  await client.expireat(`tracks:${object.tracks}`, parseInt((+new Date)/1000) + 10);
  await client.expireat(`collabs:${object.collabs}`, parseInt((+new Date)/1000) + 10);
  await client.srem('recent', object.playlist, parseInt((+new Date)/1000) + 10);
}

module.exports = expire;
