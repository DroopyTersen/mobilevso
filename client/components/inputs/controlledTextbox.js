import React from 'react';

export default class ControlledTextBox extends React.Component {
	constructor(props) {
		super(props);
	};

	//allow select all on focus
	bindEvents()  {
		var self = this;
		$(".input-field label").on("click", function() {
			$(this).parent().find("input").focus();
		});
		var $input = $('#' + this.props.name);
		$input.on("focus", function() {
			var $input = $(this);
			setTimeout(() => $input.select(), 25);
		});
	}

	componentDidMount() {
		setTimeout(() => {
			this.bindEvents();
		}, 1)
	}

	render() {
		var icon = this.props.icon 
				? <i className="material-icons prefix">{this.props.icon}</i>
				: "";

		var active = this.props.defaultValue ? "active" : "";
		return (
			<div className={'input-field col ' + this.props.width}>
				{ icon }
				<input
					type={ this.props.type || "text" }
					value= { this.props.value}
					id={this.props.name}
					name={this.props.name}
					disabled={this.props.disabled || false}
					onChange={this.props.onChange}
				/>
				<label for={this.props.name} className={active}>
					{this.props.label}
				</label>
			</div>

		);
	}
}