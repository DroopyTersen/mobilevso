import React from 'react';
import { render } from 'react-dom';
import { getSettings } from '../data/settings'
import Header from '../components/header'
class TeammatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: getSettings()
		}
	}



	render() {
		var proj = this.state.settings.project;
		return (
			<div className='page teammate'>
				<Header name='My App' />
				<div className='card-panel'>
					<p>I haven't started on this page yet</p>
					<p>Eventually it will allow you to choose a teammate and see what they have on their plate</p>
				</div>
			</div>
		);
	}
}
render(<TeammatePage />, document.getElementById('root'));
