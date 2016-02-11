import React from 'react';
require("./taskTabs.css")
import TasksList from '../tasksList'

export default class TaskTabs extends React.Component {
	componentDidUpdate() {
		setTimeout(() => $('ul.tabs').tabs(), 25)
	}

	render() {
		return (
		<div className="row">
			<div className="col s12 card-panel">
				<ul className="tabs">
					<li className="tab col s3">
						<a href="#todo-tasks">To Do</a>
					</li>
					<li className="tab col s3">
						<a href="#in-progress-tasks">In Progress</a>
					</li>
					<li className="tab col s3">
						<a href="#done-tasks">Done</a>
					</li>
				</ul>
			</div>
			<div id="todo-tasks" className="col s12">
				<TasksList tasks={this.props.tasks["To Do"]} />
			</div>
			<div id="in-progress-tasks" className="col s12">
				<TasksList tasks={this.props.tasks["In Progress"]} />
			</div>
			<div id="done-tasks" className="col s12">
				<TasksList tasks={this.props.tasks["Done"]} />
			</div>
		</div>
		);
	}
}
