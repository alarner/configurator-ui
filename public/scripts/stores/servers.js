import { Store } from 'au-flux';
import d from '../dispatcher';
const remote = require('electron').remote;
const { Server } = remote.getGlobal('models');

const Servers = Store.build('servers', d, {
	load_servers: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			Server
			.fetchAll()
			.then((servers) => {
				resolve(servers.toJSON());
			}).catch(reject);
		}
	},
	add_server: {
		// other stores that should process the click event before this one
		dependencies: ['server'],
		// the function that should run when the click happens
		run(resolve, reject, e, s, results) {
			if(results.server) {
				const newState = this.state().slice(0);
				newState.push(results.server.toJSON());
				resolve(newState);
			}
			else {
				resolve(s);
			}
		}
	}
});

export default new Servers([]);
