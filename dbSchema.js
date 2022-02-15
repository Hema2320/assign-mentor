const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
let dbName = 'class';
let dbUrl=`mongodb+srv://Hema2320:Hema2320@cluster0.kag8j.mongodb.net/${dbName}`;
module.exports={dbUrl,mongodb,MongoClient}