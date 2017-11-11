const client = require("./redis.js");

//getting data

async function playlistGet(user) {
  return new Promise((resolve, reject) => {
    let messages = [];
    client.keys("message:*", (err, keys) => {
      keys.forEach(el => {
        client.hgetall(el, (err, reply) => {
          messages.push(reply);
          if (messages.length === keys.length) {
            resolve(messages);
          }
        });
      });
    });
  });
}

module.exports = playlistGet;
