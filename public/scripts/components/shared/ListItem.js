import React from 'react';

export default class ListItem extends React.Component {

	constructor(props) {
		super(props);

		this.click = this.click.bind(this);
	}

	render() {
		return (
			<div className="list-item" key={this.props.id} onClick={this.click}>
				{
					this.props.icon ?
					<div className="list-item-icon">{this.props.icon}</div> :
					null
				}
				<div className="list-item-name">{this.props.name}</div>
			</div>
		);
	}

	click(e) {
		if(this.props.onClick) {
			this.props.onClick(this.props);
		}
	}

};
