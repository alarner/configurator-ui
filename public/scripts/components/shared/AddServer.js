import React from 'react';
import validator from 'validator';
const { dialog } = require('electron').remote;

export default class AddDroplet extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sshKeyButtonLabel: null,
			errors: {}
		};

		this.add = this.add.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.chooseSshKeyPath = this.chooseSshKeyPath.bind(this);
	}

	render() {
		const { errors } = this.state;
		return (
			<form className="form">
				<header>Add a New Droplet</header>
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
					<label className={`form-row${errors.ip ? 'error' : ''}`}>
						<div className="form-row-label">
							* IP:
						</div>
						<div className="form-row-field">
							<input type="text" ref="ip" className="form-row-field-input" />
							{ errors.ip ? <div className="form-error">{errors.ip}</div> : null }
						</div>
					</label>
					<label className={`form-row${errors.username ? 'error' : ''}`}>
						<div className="form-row-label">
							* SSH Username:
						</div>
						<div className="form-row-field">
							<input type="text" ref="username" className="form-row-field-input" />
							{ errors.username ? <div className="form-error">{errors.username}</div> : null }
						</div>
					</label>
					<label className={`form-row${errors.sshKey ? 'error' : ''}`}>
						<div className="form-row-label">
							* SSH Private Key:
						</div>
						<div className="form-row-field">
							<button className="form-row-field-input" type="button" onClick={this.chooseSshKeyPath}>
								{this.state.sshKeyButtonLabel || 'Choose SSH Key'}
							</button>
							{ errors.sshKey ? <div className="form-error">{errors.sshKey}</div> : null }
						</div>
					</label>
					<label className={`form-row${errors.configurationSet ? 'error' : ''}`}>
						<div className="form-row-label">
							Configuration Set:
						</div>
						<div className="form-row-field">
							<select className="form-row-field-input" ref="configurationSet">
								<option value="">--</option>
							</select>
							{ errors.configurationSet ? <div className="form-error">{errors.configurationSet}</div> : null }
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
		if(!this.refs.ip.value) {
			errors.ip = 'A server IP address is required.';
		}
		else if(!validator.isIP(this.refs.ip.value)) {
			errors.ip = 'Invalid IP address.';
		}
		if(!this.refs.username.value) {
			errors.username = 'A ssh username is required.';
		}
		if(!this.state.sshKeyButtonLabel) {
			errors.sshKey = 'An ssh private key is required.';
		}

		this.setState({ errors });

		if(!Object.keys(errors).length && this.props.onAdd) {
			this.props.onAdd({
				type: 'server',
				name: this.refs.name.value,
				ip: this.refs.ip.value,
				ssh_username: this.refs.username.value,
				ssh_private_key_path: this.state.sshKeyButtonLabel,
				configuration_set_id: this.refs.configurationSet.value || null
			});
		}
	}

	closeModal() {
		if(this.props.onClose) {
			this.props.onClose();
		}
	}

	chooseSshKeyPath() {
		const sshKeyButtonLabel = dialog.showOpenDialog({
			defaultPath: '~/.ssh',
			properties: ['openFile', 'showHiddenFiles']
		});
		if(sshKeyButtonLabel && sshKeyButtonLabel.length) {
			this.setState({ sshKeyButtonLabel: sshKeyButtonLabel[0] });
		}
	}

};
