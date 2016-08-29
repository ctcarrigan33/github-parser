var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use( bodyParser.json() );
app.use(express.static('./client'))

console.log('INSIDE SERVER')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});



app.post('/repos/import', function (req, res) {
	var repos = req.body;

	repos.forEach(repos => {

		knex('repos').insert({
			repo_name: repos.repo_name,
			username: repos.username,
			num_stargazer: repos.num_stargazer,
			url: repos.url
		})
		.then()
	})
});




app.get('/repos', function (req, res) {
  knex('repos').select().orderBy('num_stargazer', 'DESC').limit(25)
  .then(function(rows) {
  	res.send(rows);
  	console.log('rows', rows)
  })
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);