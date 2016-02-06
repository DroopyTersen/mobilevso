import React from 'react';
require("./task.css");
import TaskHeader from './taskHeader'
import TaskBody from './taskBody'

export default class Task extends React.Component {
	renderIcon(task) {
		if (task.state === "Done") {
			return <i className="tiny material-icons done">done</i>
		} else {
			return (
				<span className='icon'>
					<span className='remaining'>{task.remaining}</span>
					<i className="tiny material-icons">schedule</i>
				</span>
			);
		}
	}
	render() {
		var task = this.props.task;
		setTimeout(() => $(".collapsible").collapsible(), 1)
		return (
			<li>
				<TaskHeader task={task} />
				<TaskBody task={task} />
			</li>
		);
	}
}
