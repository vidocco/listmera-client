const MongoClient = require('mongodb').MongoClient;

let url;
if (process.env.MONGODB_URI) {
  url = process.env.MONGODB_URI;
} else {
  url = 'mongodb://localhost:27017/listmera';
}



function database() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) reject(err);
      console.log('MONGO LIVE');
      resolve(db);
    });
  });
}

module.exports = database();
