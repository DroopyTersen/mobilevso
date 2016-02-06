import React from 'react';
require("./tasksList.css")
import Task from '../task'

export default class TasksList extends React.Component {
	renderEmptyList() {
		var isLoading = $("#loader").length;
		if (!isLoading && this.props.tasks.length === 0) {
			return (
			<li className='card-panel grey-text'>
				There are no tasks to show...
			</li>
			)
		}
		return "";
	}
	render() {
		return (
			<ul className="collapsible popout" data-collapsible="accordion">
				{ this.props.tasks.map(t => <Task task={t} />) }
				{ this.renderEmptyList() }
			</ul>
		);
	}
}
