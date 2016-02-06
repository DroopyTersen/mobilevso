import React from 'react';
import { tasksApi } from '../../data/api';
import { notify } from '../../utils'

export default class TaskButtons extends React.Component {
	getClasses(color) {
		return `col s4 center-align waves-effect waves-${color} btn-flat ${color}-text darken-4-text`
	}
	setState(state, task) {
		if (task.state === state) return false;
		tasksApi.setState(task, state).then(newTask => {
			notify.success(`Success: Task set to <b>${state}</b>`)
			$(document).trigger("state-change", newTask);
		});
	}
	render() {
		var task = this.props.task;
		var startClasses = task.state !== "To Do" ? "btn-flat disabled" : this.getClasses("teal");
		var completeClasses = task.state === "Done" ? "btn-flat disabled" : this.getClasses("teal");
		return (
			<div className='task-buttons row'>
				<a 
					onClick={() => this.setState("In Progress", task)}
					className={"col s4 center-align " + startClasses }>
					Start
				</a>
				<a 
					onClick={() => this.setState("Done", task)}
					className={ "col s4 center-align " +completeClasses }>
					Complete
				</a>
				<a 
					onClick={() => this.setState("Removed", task)}
					className={"col s4 center-align " + this.getClasses("red")}>
					Remove
				</a>
			</div>
		);
	}
}
