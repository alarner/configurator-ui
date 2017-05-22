import { Store } from 'au-flux';
import d from '../dispatcher';
const remote = require('electron').remote;
const { Server } = remote.getGlobal('models');

const ServerStore = Store.build('server', d, {
	fetch_server: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			console.log('fetch_server', e);
			Server
			.forge({ id: e.id })
			.fetch()
			.then((server) => {
				resolve(server.toJSON());
			}).catch(reject);
		}
	},
	add_server: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			Server
			.forge(e)
			.save()
			.then(resolve)
			.catch(reject);
		}
	}
});

export default new ServerStore({});
