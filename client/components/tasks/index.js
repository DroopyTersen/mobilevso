import React from 'react';
import { render } from 'react-dom';

import { getSettings } from '../../data/settings';
import { tasksApi } from '../../data/api'
import TaskTabs from '../taskTabs'
import SearchFab from '../inputs/searchFab'
import { filterTasks, switchState, refreshTask } from '../../data/dataProcessing'
import { clone, notify } from '../../utils'

var defaultTasks = { "To Do": [], "In Progress": [], "Done": [] };
var searchValue = "";

export default class Tasks extends React.Component {
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
		searchValue = value;
		var tasks = filterTasks(value, this.state.allTasks);
		this.setState({tasks});
	}

	bindEvents() {
		$(document).on("state-change", this.handleStateChange.bind(this));
	}

	updateTasks(allTasks) {
		var tasks = clone(allTasks);
		if (searchValue) {
			tasks = filterTasks(searchValue, allTasks);
		}
		this.setState({tasks, allTasks});
	}
	handleStateChange(e, updatedTask) {
		var allTasks = switchState(updatedTask, this.state.allTasks);
		this.updateTasks(allTasks);
		setTimeout(() => {
			$(".task-body span.remaining").each(function(){
				var $this = $(this);
				var val = $(this).attr("data-value");
				$this.find("input").val(val);
			});
		}, 100)
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.user && this.props.user !== nextProps.user) {
			setTimeout(this.fetchData.bind(this), 1);
		}
		return true;
	}

	refreshTask(e, task) {
		console.log("refresh task");
		var allTasks = refreshTask(task, this.state.allTasks);
		this.updateTasks(allTasks);
	}

	fetchData() {
		tasksApi.getOpenTasks(this.state.project.name, this.props.user)
			.then(tasks => {
				var allTasks = Object.assign({}, defaultTasks, tasks);
				this.setState({ tasks: filterTasks(searchValue, allTasks), allTasks })
				return tasksApi.getRecentDone(this.state.project.name, this.props.user);
			})
			.then(tasks => {
				var allTasks = Object.assign({}, this.state.tasks, tasks);
				var tasks = filterTasks(searchValue, allTasks);
				this.setState({ tasks, allTasks});
			})		
	}
	bindEvents() {
		$(document).on("state-change", this.handleStateChange.bind(this));
		$(document).on("refresh-task", this.refreshTask.bind(this));
	}
	componentWillMount() {
		// Ensure a project has been selected
		if (!this.state.project || !this.state.project.name) {
			window.location.href = "/projects"
		}
		//setTimeout(() => this.bindEvents, 10);
		this.fetchData();
	}

	componentDidMount() {
		setTimeout(() => this.bindEvents(), 10);
	}

	render() {
		console.log(this.state.tasks);
		return (
			<div>
				<TaskTabs tasks={this.state.tasks} />
				<SearchFab handleChange={this.search} delay={300} />
			</div>
		);
	}
}
