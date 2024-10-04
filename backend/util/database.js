const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect(
        'mongodb+srv://urbanfarm:urbanfarm@cluster0.9afjj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
    )
        .then(client => {
            console.log("Connected!!")
            _db = client.db()
            callback()
        })
        .catch(err => {
            console.log(err)
        })
}

const getDb = () => {
    if(_db) {
        return _db
    }
    throw "Database not connected"
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;