import React from 'react';
import { render } from 'react-dom';
import { getSettings } from '../data/settings'
import Header from '../components/header'

class HelpPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: getSettings()
		}
	}



	render() {
		var subtitle = { fontSize:"1.2em", fontWeight:300, margin:"20px 0 5px" }
		var proj = this.state.settings.project;
		return (
			<div className='page help'>
				<Header name='My App' />
				<div className='card-panel'>
					<h5 className='teal-text card-title'>What am I seeing?</h5>

					<div className='grey-text sub-title' style={subtitle}>My Tasks</div>
					<div>
						Shows tasks and bugs <b>assigned to you</b> from <b>any iteration</b>.  Does not show items
						that are 'Done' or 'Removed'.  
					</div>

					<div className='grey-text sub-title' style={subtitle}>Iteration Stats</div>
					<div>
						Displays the burndown chart for the current iteration of your selected project.
					</div>

					<div className='grey-text sub-title' style={subtitle}>Switch Project</div>
					<div>
						Shows all the projects you have access to.  <b>Does not show sub-areas</b> underneath a top level VSO project.
					</div>
				</div>

				<div className='card-panel'>
					<h5 className='teal-text card-title'>What can I do?</h5>

					<div className='grey-text sub-title' style={subtitle}>My Tasks</div>
					<ul>
						<li>
							<b>Update State</b> - You can move tasks to In Progress, Done, or Removed by expanding a task and pressing 'Start', 'Complete', or 'Remove'
						</li>
						<li>
							<p></p>
							<b>Update Remaining Hours</b> - Expand a task and update the 'Remaining' input value
						</li>
						<li>
							<p></p>
							<b>Move to current iteration</b> - Expand a task and press the blue calendar icon
						</li>
					</ul>

				</div>
			</div>
		);
	}
}
render(<HelpPage />, document.getElementById('root'));
