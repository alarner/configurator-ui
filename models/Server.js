require('./ConfigurationSet');
module.exports = bookshelf.model('Server', {
	tableName: 'servers',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	configurationSet: function() {
		return this.belongsTo('ConfigurationSet', 'configuration_set_id');
	}
});
