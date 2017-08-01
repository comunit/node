var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to database
mongoose.connect('mongodb://test:test@ds129733.mlab.com:29733/todo');

//create a schema

var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'walk dog'}, {item: 'coding'}, {item: 'eat'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	
	app.get('/todo', function(req, res) {
		//get data from mongo db
	   Todo.find({}, function(err, data){
          if (err) throw err;
          res.render('todo', {todos: data});
	   });
	});

	app.post('/todo', urlencodedParser, function(req, res) {
	   //get data from the view and add it to mongodb
	   var newTodo = Todo(req.body).save(function(err,data) {
	   	if (err) throw err;
	   	res.json(data);
	   });
	});

	app.delete('/todo/:item', function(req, res) {
		// delete requested from mongodb
	   Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
         if (err) throw err;
         res.json(data);
	   });
	});
};