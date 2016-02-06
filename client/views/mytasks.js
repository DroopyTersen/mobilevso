import React from 'react';
import { render } from 'react-dom';

import { getSettings } from '../data/settings';
import { tasksApi } from '../data/api'
import Header from '../components/header'
import TaskTabs from '../components/taskTabs'
import SearchFab from '../components/inputs/searchFab'

var defaultTasks = { "To Do": [], "In Progress": [], "Done": [] };

class MyTasksPage extends React.Component {
	constructor(props) {
		super(props);
		var settings = getSettings();
		this.state = {
			project: settings.project,
			tasks: defaultTasks,
			allTasks: defaultTasks
		} 
		this.search = this.search.bind(this);
	}

	search(value) {
		if (value) {
			value = value.toLowerCase();
			var filterFunc = task => {
				var compareStr = (task.path + task.title).toLowerCase();
				return compareStr.indexOf(value) > -1
			}
			var tasks = Object.assign({}, this.state.allTasks);
			tasks["To Do"] = tasks["To Do"].filter(filterFunc);
			tasks["In Progress"] = tasks["In Progress"].filter(filterFunc);
			tasks["Done"] = tasks["Done"].filter(filterFunc);
			this.setState({tasks});
		} else {
			this.setState({tasks: this.state.allTasks})
		}
		console.log(this.state);
	}
	componentWillMount() {
		var settings = getSettings();
		if (!settings.project || !settings.project.name) {
			window.location.href = "/projects"
		}
		tasksApi.getMyTasks(settings.project.name)
		.then(tasks => {
			tasks = Object.assign(defaultTasks, tasks);
			this.setState({ tasks, allTasks: Object.assign({},tasks) })
			return tasksApi.getMyRecentDone(settings.project.name);
		})
		.then(tasks => {
			var newTasks = Object.assign({}, this.state.tasks, tasks);
			var allTasks = Object.assign({}, newTasks);
			this.setState({ tasks: newTasks, allTasks});
		})
	}
	renderTasks(tasks = []) {
		return tasks.map(task => {
			return <li className='truncate'>{task.title}</li>
		})
	}
	render() {
		return (
			<div className='view mytasks'>
				<Header name='My App' />
				<TaskTabs tasks={this.state.tasks} />
				<span>{this.state.project.name}</span>
				<SearchFab handleChange={this.search} delay={300} />
			</div>
		);
	}
}
render(<MyTasksPage />, document.getElementById('root'));
