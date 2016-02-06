import React from 'react';
require("./tasksList.css")
import Task from '../task'

export default class TasksList extends React.Component {
	render() {
		return (
			<ul className="collapsible popout" data-collapsible="accordion">
				{ this.props.tasks.map(t => <Task task={t} />) }
			</ul>
		);
	}
}
