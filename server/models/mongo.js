const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/listmera';

function database() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) reject(err);
      console.log('connected to mongo');
      resolve(db);
    });
  });
}

module.exports = database();