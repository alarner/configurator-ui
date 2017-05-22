import { Store } from 'au-flux';
import d from '../dispatcher';
const remote = require('electron').remote;
const { ConfigurationSet } = remote.getGlobal('models');

const ConfigurationSets = Store.build('configuration_sets', d, {
	load_configuration_sets: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			ConfigurationSet
			.fetchAll()
			.then((configurationSets) => {
				resolve(configurationSets.toJSON());
			}).catch(reject);
		}
	},
	add_configuration_set: {
		// other stores that should process the click event before this one
		dependencies: ['configuration_set'],
		// the function that should run when the click happens
		run(resolve, reject, e, s, results) {
			if(results.configuration_set) {
				const newState = this.state().slice(0);
				newState.push(results.configuration_set.toJSON());
				resolve(newState);
			}
			else {
				resolve(s);
			}
		}
	}
});

export default new ConfigurationSets([]);
