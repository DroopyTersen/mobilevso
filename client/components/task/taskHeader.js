import React from 'react';

export default class TaskHeader extends React.Component {
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
		return (
			<div className='collapsible-header task-header'>
				{this.renderIcon(task)}

				<b className='truncate task-title'>{task.title}</b>
				<span className='truncate task-subtitle'>
					{task.path}
				</span>
			</div>
		);
	}
}
