import React from 'react';
import Rayon from 'rayon';

import List from './List';
import AddServer from './AddServer';
import AddConfigurationSet from './AddConfigurationSet';

import servers from '../../stores/servers.js';
import configuration_sets from '../../stores/configuration_sets.js';

import d from '../../dispatcher';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modalComponent: null,
			servers: servers.connectToState('shared/Navigation', this.setState.bind(this)),
			configuration_sets: configuration_sets.connectToState('shared/Navigation', this.setState.bind(this))
		};

		this.showServer = this.showServer.bind(this);
		this.showConfigurationSet = this.showConfigurationSet.bind(this);
		this.add = this.add.bind(this);
		this.addServer = this.addServer.bind(this);
		this.addConfigurationSet = this.addConfigurationSet.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	render() {
		let ModalComponent = this.state.modalComponent;
		return (
			<nav className="navigation">
				<List
				name="Droplets"
				onAdd={this.showServer}
				data={this.state.servers.data}
				defaultIcon={<i className="fa fa-tint" aria-hidden="true" />}
				onClick={(s) => this.navigate(`/server/${s.id}`)} />
				<List
				name="Configuration Sets"
				onAdd={this.showConfigurationSet}
				data={this.state.configuration_sets.data}
				defaultIcon={<i className="fa fa-cogs" aria-hidden="true" />}
				onClick={(s) => this.navigate(`/configuration-set/${s.id}`)} />
				<Rayon isOpen={ModalComponent} onClose={this.closeModal}>
					{ ModalComponent ? <ModalComponent onClose={this.closeModal} onAdd={this.add} /> : null }
				</Rayon>
			</nav>
		);
	}

	componentWillUnmount() {
		servers.ignore('shared/Navigation');
		configuration_sets.ignore('shared/Navigation');
	}

	showServer() {
		this.setState({ modalComponent: AddServer });
	}

	showConfigurationSet() {
		this.setState({ modalComponent: AddConfigurationSet });
	}

	add(data) {
		const type = data.type;
		let promise = null;
		delete data.type;
		if(type === 'server') {
			promise = this.addServer(data);
		}
		else if(type === 'configuration_set') {
			promise = this.addConfigurationSet(data);
		}

		promise.then(this.closeModal);
	}

	addServer(server) {
		return d.trigger('add_server', server);
	}

	addConfigurationSet(configurationSet) {
		return d.trigger('add_configuration_set', configurationSet);
	}

	closeModal() {
		this.setState({ modalComponent: null });
	}

	navigate(path) {
		d.trigger('navigate', { path });
	}
};
