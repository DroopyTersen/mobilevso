import React from 'react';

export default class TaskButtons extends React.Component {
	getClasses(color) {
		return `col s4 center-align waves-effect waves-${color} btn-flat ${color}-text darken-4-text`
	}
	render() {
		var task = this.props.task;
		var startClasses = task.state !== "To Do" ? "btn-flat disabled" : this.getClasses("teal");
		var completeClasses = task.state === "Done" ? "btn-flat disabled" : this.getClasses("teal");
		return (
			<div className='task-buttons row'>
				<a className={"col s4 center-align " + startClasses }>
					Start
				</a>
				<a className={ "col s4 center-align " +completeClasses }>
					Complete
				</a>
				<a className={"col s4 center-align " + this.getClasses("red")}>
					Remove
				</a>
			</div>
		);
	}
}
