import React from 'react';
import { render } from 'react-dom';
import { getSettings } from '../data/settings'
import Header from '../components/header'
import PeoplePicker from '../components/peoplePicker'
import Tasks from '../components/tasks'

var defaultTasks = { "To Do": [], "In Progress": [], "Done": [] };
class TeammatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: getSettings(),
			user: ""
		} 
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(user) {
		console.log("Changing user: " + user);
		this.setState({user});
	}
	render() {
		var proj = this.state.settings.project;
		var tasks = this.state.user
			? <Tasks user={this.state.user} />
			: <div className='card-panel'>Pick a user</div>

		return (
			<div className='page teammate'>
				<Header name='My App' />
				{tasks}
				<PeoplePicker delay={150} onChange={this.handleUserChange} />
			</div>
		);
	}
}
render(<TeammatePage />, document.getElementById('root'));
