import React from 'react';
const { dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

export default class AddDroplet extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			directoryLabel: null,
			errors: {}
		};

		this.add = this.add.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.chooseDirectory = this.chooseDirectory.bind(this);
	}

	render() {
		const { errors } = this.state;
		return (
			<form className="form">
				<header>Add a New Configuration Set</header>
				<section>
					<label className={`form-row${errors.name ? 'error' : ''}`}>
						<div className="form-row-label">
							* Name:
						</div>
						<div className="form-row-field">
							<input type="text" ref="name" className="form-row-field-input" />
							{ errors.name ? <div className="form-error">{errors.name}</div> : null }
						</div>
					</label>
					<label className={`form-row${errors.directory ? 'error' : ''}`}>
						<div className="form-row-label">
							* Directory:
						</div>
						<div className="form-row-field">
							<button className="form-row-field-input" type="button" onClick={this.chooseDirectory}>
								{this.state.directoryLabel || 'Choose Directory'}
							</button>
							{ errors.directory ? <div className="form-error">{errors.directory}</div> : null }
						</div>
					</label>
				</section>
				<footer>
					<button onClick={this.add}>Save</button>
					<button onClick={this.closeModal}>Close</button>
				</footer>
			</form>
		);
	}

	add(e) {
		e.preventDefault();
		let errors = {};
		if(!this.refs.name.value) {
			errors.name = 'A server name is required.';
		}
		if(!this.state.directoryLabel) {
			errors.directory = 'A directory is required.';
		}
		else if(!fs.existsSync(path.join(this.state.directoryLabel, 'configuration.json'))) {
			errors.directory = 'The directory is missing a configuration.json file.';
		}

		this.setState({ errors });

		if(!Object.keys(errors).length && this.props.onAdd) {
			this.props.onAdd({
				type: 'configuration_set',
				name: this.refs.name.value,
				root_path: this.state.directoryLabel
			});
		}
	}

	closeModal() {
		if(this.props.onClose) {
			this.props.onClose();
		}
	}

	chooseDirectory() {
		const directoryLabel = dialog.showOpenDialog({
			defaultPath: '~',
			properties: ['openDirectory', 'showHiddenFiles']
		});
		if(directoryLabel && directoryLabel.length) {
			this.setState({ directoryLabel: directoryLabel[0] });
		}
	}

};
