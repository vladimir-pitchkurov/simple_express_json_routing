var mongoClient = require('mongodb').MongoClient;

var state = {
    db : null
};

exports.connect = function (url, callback) {
    if(state.db){
        return callback();
    }
    MongoClient.connect(url, function (err, db) {
        if(err){
            return callback(err)
        }
        state.db = db;
        callback()
    })
};