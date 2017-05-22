import React from 'react';

import server from '../../stores/server.js';

import d from '../../dispatcher';

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			server: server.connectToState('pages/Server', this.setState.bind(this)),
			status: 'Trying to connect'
		};
	}

	componentDidMount() {
		d.trigger('fetch_server', { id: this.props.params.id });
	}

	render() {
		const server = this.state.server.data;
		return (
			<div className="page">
				<div className="server-information">
					<h2>{server.name}</h2>
					<div className="server-information-row">
						<div>{server.ip}</div>
						<div>{this.state.status}</div>
					</div>
					<div className="server-information-row">
						<div>{server.ssh_username}</div>
						<div>{server.ssh_private_key_path}</div>
					</div>
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		server.ignore('pages/Server');
	}

	componentWillReceiveProps(newProps) {
		if(this.props.params.id !== newProps.params.id) {
			d.trigger('fetch_server', { id: newProps.params.id });
		}
	}
};
