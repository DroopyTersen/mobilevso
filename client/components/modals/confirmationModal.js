import React from 'react';

export default class ConfirmationModal extends React.Component {
	render() {
		var header = this.props.header || "Final answer?";
		var text = this.props.text ? <p>{this.props.text}</p> : "";

		return (
			<div id={this.props.name} className="modal">
				<div className="modal-content">
					<h5>{header}</h5>
					{text}
				</div>
				<div className="modal-footer center-align">
					<a href="#" 
						onClick={() => {
							$("#"+this.props.name).closeModal(); 
							this.props.onConfirm();
						}}
						className=" modal-action modal-close waves-effect teal-text waves-green btn-flat">
						Yes
					</a>
					<a href="#" 
						onClick={() => {
							$("#"+this.props.name).closeModal(); 
						}}
						className=" modal-action modal-close waves-effect waves-green btn-flat">
						No
					</a>
				</div>
			</div>
		);
	}
}
