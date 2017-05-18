import React from 'react';
import Rayon from 'rayon';

import List from './List';
import AddDroplet from './AddDroplet';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modalComponent: null
		};

		this.addDroplet = this.addDroplet.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	render() {
		let ModalComponent = this.state.modalComponent;
		return (
			<nav className="navigation">
				<List name="Droplets" onAdd={this.addDroplet} />
				<Rayon isOpen={ModalComponent} onClose={this.closeModal}>
					{ ModalComponent ? <ModalComponent onClose={this.closeModal} /> : null }
				</Rayon>
			</nav>
		);
	}

	addDroplet() {
		this.setState({ modalComponent: AddDroplet });
	}

	closeModal() {
		this.setState({ modalComponent: null });
	}
};
