import React from 'react';
import navigation from '../stores/navigation';

// Components: Pages
import Home from './pages/Home';

import Navigation from './shared/Navigation';

const pages = {
	Home
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navigation: navigation.connectToState('App', this.setState.bind(this))
		};
	}

	render() {
		const Page = pages[this.state.navigation.data.current.component];
		console.log(this.state.navigation.data.current.component);
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
