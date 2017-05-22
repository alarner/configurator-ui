import { Store } from 'au-flux';
import d from '../dispatcher';
import routes from '../routes';
import pathToRegexp from 'path-to-regexp';

const Navigation = Store.build('navigation', d, {
	navigate: {
		// other stores that should process the click event before this one
		dependencies: [],
		// the function that should run when the click happens
		run(resolve, reject, e, s) {
			this.applyRoute(resolve, reject, e, s, '/');
		}
	},
	add_configuration_set: {
		// other stores that should process the click event before this one
		dependencies: ['configuration_set'],
		// the function that should run when the click happens
		run(resolve, reject, e, s, results) {
			if(results.configuration_set) {
				this.applyRoute(resolve, reject, e, s, `/configuration-set/${results.configuration_set.get('id')}`);
			}
			else {
				resolve(s);
			}
		}
	},
	add_server: {
		// other stores that should process the click event before this one
		dependencies: ['server'],
		// the function that should run when the click happens
		run(resolve, reject, e, s, results) {
			if(results.server) {
				console.log('navigation add_server', results.server.get('id'));
				this.applyRoute(resolve, reject, e, s, `/server/${results.server.get('id')}`);
			}
			else {
				resolve(s);
			}
		}
	}
});

Navigation.prototype = {
	init(routes, options) {
		this.options = options;
		this.current = null;
		this.routes = [];
		for(const route of routes) {
			const _keys = [];
			const regex = pathToRegexp(route.pattern, _keys);
			const newRouteObj = Object.assign({
				regex,
				_keys,
				active: false,
				params: {},
				extra: {},
				path: null
			}, route);
			this.routes.push(newRouteObj);
		}
		const { hash, pathname } = window.location;
		const modifiedPath = this.options.useHash ? hash.substr(1) : pathname;
		this.setData({ routes: this.routes, current: this.setPage(modifiedPath, true) });

		if(this.options.useHash) {
			window.addEventListener('hashchange', (e) => {
				let path = window.location.hash.substr(1);
				if(path.charAt(0) !== '/') {
					path = '/' + path;
				}
				this.setData(
					Object.assign({}, this.state(), { current: this.setPage(path, false, false) })
				);
				this.change('hashchange');
			});
		}
	},
	setPage(path, replace=false, trigger=true) {
		const pathPieces = path.split('?');
		const pathname = pathPieces[0];
		const query = {};
		if(pathPieces.length > 1) {
			const pairs = pathPieces[1].split('&');
			for(const pair of pairs) {
				const [key, value] = pair.split('=');
				query[key] = value;
			}
		}
		let matches = null;
		let found = false;
		for(const route of this.routes) {
			matches = pathname.match(route.regex);
			if(!found && matches) {
				route.active = true;
				route.params = {};
				route.query = query;
				for(let i=0; i<route._keys.length; i++) {
					route.params[route._keys[i].name] = matches[i+1];
				}
				let modifiedPath = path;
				if(this.options.useHash) {
					modifiedPath = '#'+path;
				}
				if(trigger) {
					if(replace) {
						window.history.replaceState({}, route.title, modifiedPath);
					}
					else {
						window.history.pushState({}, route.title, modifiedPath);
					}
				}
				// this.current = route;
				found = route;
				window.scrollTo(0, 0);
			}
			else {
				route.active = false;
				route.params = {};
				route.extra = {};
				route.path = null;
				route.query = {};
			}
		}
		return found;
	},
	applyRoute(resolve, reject, event, state, defaultPath) {
		const path = event.path || event.redirect || defaultPath;
		const route = this.setPage(path);
		if(!route) {
			return reject({ default: `There is no route that matches "${path}"` });
		}
		route.extra = event.extra || {};
		resolve(Object.assign({}, state, { current: route }));
	}
};

const nav = new Navigation();
nav.init(routes, { useHash: true });
export default nav;
