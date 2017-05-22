import { Store } from 'au-flux';
import d from '../dispatcher';
const remote = require('electron').remote;
const { ConfigurationSet } = remote.getGlobal('models');

const ConfigurationSetStore = Store.build('configuration_set', d, {
	fetch_configuration_set: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			ConfigurationSet
			.forge({ id: event.id })
			.fetch()
			.then((server) => {
				resolve(server.toJSON());
			}).catch(reject);
		}
	},
	add_configuration_set: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			ConfigurationSet
			.forge(e)
			.save()
			.then(resolve)
			.catch(reject);
		}
	}
});

export default new ConfigurationSetStore({});
