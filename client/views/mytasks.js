import React from 'react';
import { render } from 'react-dom';
import Header from '../components/header'
import Tasks from '../components/tasks'
class MyTasksPage extends React.Component {

	render() {
		return (
			<div className='view mytasks'>
				<Header name='My App' />
				<Tasks />
			</div>
		);
	}
}
render(<MyTasksPage />, document.getElementById('root'));
