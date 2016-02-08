import React from 'react';
import { render } from 'react-dom';

import Header from '../components/header'

class LoginHelpPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='page loginhelp'>
				<Header name='My App' />
				      <div className="row">
        				<div className="col s12 m7">
          					<div className="card">
            					<div className="card-image">
									<img src="https://i3-vso.sec.s-msft.com/integrate/get-started/auth/profile.png" alt="My profile on the dropdown from your user name" />
            					</div>
            					<div className='card-content'>
              						<span>1. Login to VSO and open your profile</span>
            					</div>
        					</div>
    					</div>
					</div>

			      <div className="row">
        				<div className="col s12 m7">
          					<div className="card">
            					<div className="card-image">
									<img src="https://i3-vso.sec.s-msft.com/integrate/get-started/auth/enableCredentials.png" alt="Enable credentials link on the credentials tab of your profile" />
            					</div>
            					<div className='card-content'>
              						<span>2. Enable alternate credentials on the credentials tab.  Choose a username and password.</span>
            					</div>
        					</div>
    					</div>
					</div>

			</div>
		);
	}
}
render(<LoginHelpPage />, document.getElementById('root'));
