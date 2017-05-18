module.exports = {
	client: 'sqlite',
	connection: {
		filename: './configurator.sqlite'
	},
	migrations: {
		tableName: 'migrations'
	},
	seeds: {
		directory: './seeds/dev'
	}
};
