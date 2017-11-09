const redis = require("redis");
const client = redis.createClient();

client.on("error", err => {
  console.log(err);
});

client.on("connect", msg => {
  console.log("connected to redis");
});

module.exports = client;
