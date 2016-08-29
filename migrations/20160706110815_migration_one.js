
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('repos', function(table) {
		table.increments('uid').primary();
	 	table.string('repo_name').unique();
	 	table.string('username');
	 	table.integer('num_stargazer');
	 	table.string('url');
  	}),
  ])
};

exports.down = function(knex, Promise) {
	return Promise.all([
	        knex.schema.dropTable('repos')
	])
};