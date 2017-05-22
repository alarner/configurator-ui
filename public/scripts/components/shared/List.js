import React from 'react';

import ListItem from './ListItem';

export default class List extends React.Component {

	constructor(props) {
		super(props);

		this.add = this.add.bind(this);
		this.click = this.click.bind(this);
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
				<div>
					{this.props.data.map((d) => (
						<ListItem
						key={d.id}
						{...d}
						icon={d.icon || this.props.defaultIcon}
						onClick={this.click} />
					))}
				</div>
			</section>
		);
	}

	add() {
		if(this.props.onAdd) {
			this.props.onAdd();
		}
	}

	click(data) {
		if(this.props.onClick) {
			this.props.onClick(data);
		}
	}

};
