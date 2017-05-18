exports.up = function(knex, Promise) {
	return knex.schema.createTable('servers', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.string('ip').notNull();
		t.string('ssh_username').notNull();
		t.string('ssh_private_key_path').nullable();
		t.integer('configuration_set_id')
			.unsigned()
			.nullable()
			.references('id')
			.inTable('configuration_sets')
			.onDelete('SET NULL');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('servers');
};
