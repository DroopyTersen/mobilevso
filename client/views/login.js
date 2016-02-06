import React from 'react';
import { render } from 'react-dom';

import { getSettings, updateSettings } from '../data/settings';

import Header from '../components/header'
import LoginForm from '../components/loginForm'
class LoginPage extends React.Component {
	constructor(props) {
		super(props);
	}

	hostChange(newValue) {
		updateSettings({ host: newValue.toLowerCase() });
	}

	render() {
		var settings = getSettings();
		return (
			<div className='view login'>
				<Header />
				<LoginForm host={settings.host} hostChange={this.hostChange}/>
			</div>
		);
	}
}
render(<LoginPage />, document.getElementById('root'));
