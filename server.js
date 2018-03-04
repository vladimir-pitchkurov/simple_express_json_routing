var exprss = require('express');
var bodyParser = require('body-parser');
var app = exprss();
var mongoClient = require('mongodb').MongoClient;
var db;
var MyObjectId = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/artists', function (req, res) {
    console.log(req.body);
    var artist = {
        name: req.body.name
    };
    db.collection('artists').insert(artist, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
});

app.delete('/artists/:id', function (req, resp) {
    db.collection('artists').deleteOne({_id: MyObjectId(req.params.id)}, function (err, result) {
        if(err){
            console.log(err);
            return resp.sendStatus(500);
        }
        resp.sendStatus(200);
    })
});

app.put('/artists/:id', function (req, res) {
    db.collection('artists').update(
        { _id: MyObjectId(req.params.id)},
        {name: req.body.name},
        function (err, result) {
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
             res.sendStatus(200);
        })
});

app.get('/', function (req, res) {
    res.send('Hello Api!');
});

app.get('/artists', function (req, res) {
    db.collection('artists').find().toArray(function (mongoError, docs) {
        if(mongoError){
            console.log(mongoError);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

app.get('/artists/:id', function (req, res) {
    db.collection('artists').findOne({ _id : MyObjectId(req.params.id)}, function (err, docs) {
        console.log(this);
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

mongoClient.connect('mongodb://localhost:27017/mytestdb', function (err, database) {
    if (err) {
        return console.log(err);
    }
    db = database.db('mytestdb');
    var collection = db.collection('artists');

    app.listen('3012', function () {
        console.log('API app started!');
    });
});

;