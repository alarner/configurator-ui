exports.up = function(knex, Promise) {
	return knex.schema.createTable('configuration_sets', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.string('root_path').notNull();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('configuration_sets');
};
