const {MongoClient} = require('mongodb');

exports.MONGO_CLIENT = new MongoClient(process.env.MONGO_URI);
