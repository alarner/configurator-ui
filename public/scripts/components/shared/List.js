import React from 'react';

export default class List extends React.Component {

	constructor(props) {
		super(props);

		this.add = this.add.bind(this);
	}

	render() {
		return (
			<section className="list">
				<header>
					<div className="list-header-name">{this.props.name}</div>
					<button>
						<i className="fa fa-plus" aria-hidden="true" onClick={this.add} />
					</button>
				</header>
			</section>
		);
	}

	add() {
		if(this.props.onAdd) {
			this.props.onAdd();
		}
	}

};
