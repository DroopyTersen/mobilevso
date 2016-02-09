import React from 'react';
import { render } from 'react-dom';
import { getSettings } from '../data/settings'
import Header from '../components/header'
import BurndownChart from '../components/burndownChart'
class IterationStatsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: getSettings()
		}
	}



	render() {
		var proj = this.state.settings.project;
		return (
			<div className='page home'>
				<Header name='My App' />
				<BurndownChart project={proj}/>
			</div>
		);
	}
}
render(<IterationStatsPage />, document.getElementById('root'));
