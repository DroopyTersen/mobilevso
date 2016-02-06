import React from 'react';
import { render } from 'react-dom';

import Header from '../components/header'

class AdminPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='page home'>
				<Header name='My App' />
			</div>
		);
	}
}
render(<AdminPage />, document.getElementById('root'));
