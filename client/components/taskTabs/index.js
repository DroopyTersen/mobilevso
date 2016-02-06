import React from 'react';
require("./taskTabs.css")
import TasksList from '../tasksList'

export default class TaskTabs extends React.Component {
	render() {
		return (
		<div className="row">
			<div className="col s12 card-panel">
				<ul className="tabs">
					<li className="tab col s3">
						<a href="#todoTasks">To Do</a>
					</li>
					<li className="tab col s3">
						<a className='active' href="#inProgressTasks">In Progress</a>
					</li>
					<li className="tab col s3">
						<a href="#doneTasks">Done</a>
					</li>
				</ul>
			</div>
			<div id="todoTasks" className="col s12">
				<TasksList tasks={this.props.tasks["To Do"]} />
			</div>
			<div id="inProgressTasks" className="col s12">
				<TasksList tasks={this.props.tasks["In Progress"]} />
			</div>
			<div id="doneTasks" className="col s12">
				<TasksList tasks={this.props.tasks["Done"]} />
			</div>
		</div>
		);
	}
}
