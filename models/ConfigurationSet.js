require('./Server');
module.exports = bookshelf.model('ConfigurationSet', {
	tableName: 'configuration_sets',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	servers: function() {
		return this.hasMany('Server', 'configuration_set_id');
	}
});
