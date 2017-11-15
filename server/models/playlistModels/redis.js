let client;
if (process.env.REDIS_URL) {
  client = require('redis').createClient(process.env.REDIS_URL);
} else {
  client = require('redis').createClient();
}

client.on('error', err => {
  console.error(err);
});

client.on('connect', msg => {
  console.log('REDIS LIVE');
});

module.exports = client;
