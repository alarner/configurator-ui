import React from 'react';
import navigation from '../stores/navigation';
import d from '../dispatcher';

// Components: Pages
import Home from './pages/Home';
import Server from './pages/Server';
import ConfigurationSet from './pages/ConfigurationSet';

import Navigation from './shared/Navigation';

const pages = {
	Home,
	Server,
	ConfigurationSet
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navigation: navigation.connectToState('App', this.setState.bind(this))
		};
		d.trigger('load_servers');
		d.trigger('load_configuration_sets');
	}

	render() {
		const Page = pages[this.state.navigation.data.current.component];
		return (
			<div className={`component component-${this.state.navigation.data.current.component}`}>
				<Navigation />
				<Page params={this.state.navigation.data.current.params} />
			</div>
		);
	}

	componentWillUnmount() {
		navigation.ignore('App');
	}
};
