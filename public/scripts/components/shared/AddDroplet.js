import React from 'react';
const { dialog } = require('electron').remote;

export default class AddDroplet extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sshKeyButtonLabel: 'Choose SSH Key'
		};

		this.add = this.add.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.chooseSshKeyPath = this.chooseSshKeyPath.bind(this);
	}

	render() {
		return (
			<div>
				<header>Add a New Droplet</header>
				<section>
					<form className="form">
						<label className="form-row">
							<div className="form-row-label">
								Name:
							</div>
							<input type="text" ref="name" className="form-row-field" />
						</label>
						<label className="form-row">
							<div className="form-row-label">
								IP:
							</div>
							<input type="text" ref="name" className="form-row-field" />
						</label>
						<label className="form-row">
							<div className="form-row-label">
								SSH Username:
							</div>
							<input type="text" ref="name" className="form-row-field" />
						</label>
						<label className="form-row">
							<div className="form-row-label">
								SSH Private Key:
							</div>
							<button className="form-row-field" type="button" onClick={this.chooseSshKeyPath}>
								{this.state.sshKeyButtonLabel}
							</button>
						</label>
						<label className="form-row">
							<div className="form-row-label">
								Configuration Set:
							</div>
							<select className="form-row-field">
								<option>--</option>
							</select>
						</label>
					</form>
				</section>
				<footer>
					<button onClick={this.saveDroplet}>Save</button>
					<button onClick={this.closeModal}>Close</button>
				</footer>
			</div>
		);
	}

	add() {
		if(this.props.onAdd) {
			this.props.onAdd();
		}
	}

	closeModal() {
		if(this.props.onClose) {
			this.props.onClose();
		}
	}

	chooseSshKeyPath() {
		this.setState({
			sshKeyButtonLabel: dialog.showOpenDialog({
				defaultPath: '~/.ssh',
				properties: ['openFile', 'showHiddenFiles']
			})
		});
	}

};
