module.exports = function (app) {
	var MongoClient = require('mongodb').MongoClient
	var URL = 'mongodb://vijay:vijay123@ds125994.mlab.com:25994/todo_db'
	var ObjectId = require('mongodb').ObjectID;
	var db;
	
	MongoClient.connect(URL, function(err, database) {
	  if (err) return;

	 db = database;
	})

	var successCallback = function(res){
	  db.collection('tasks').find().toArray(function(err, results) {
	      res.json(results);
	    })
	}

	app.post('/task', function(req, res) {
	  db.collection('tasks').save(req.body, function(err, result)  {
	    if (err) return;
	    successCallback(res);
	  })
	});

	app.get('/task', function(req, res) {
	   successCallback(res);
	});


	app.delete('/task/:id', function(req, res){
	  db.collection('tasks').remove( {_id: ObjectId(req.params.id)} , function(err, result){
	    if (err) return;
	      successCallback(res)
	  });
	});

	app.put('/task/:id', function(req, res) {
	  db.collection('tasks').update({ _id: ObjectId(req.params.id)},
	      {
	          text: req.body.text
	      },
	    function(err, result){
	    if (err) return;
	      successCallback(res)
	  });
	});
}