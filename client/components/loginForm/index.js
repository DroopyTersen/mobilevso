import React from 'react';
import TextBox from '../inputs/textBox';

require("./login.css")

export default class LoginForm extends React.Component {

	constructor(props) {
    	super(props);
	}

	bindEvents() {
		var self = this;

		$("#host").on("blur", function() {
			var newValue = $(this).val();
			// if no '.' then append ".visualstudio.com"
			if (newValue && newValue.indexOf(".") < 0) {
				newValue += ".visualstudio.com";
				$(this).val(newValue);
			}

			if (self.props.hostChange) {
				self.props.hostChange(newValue);
			}
		})
	}

	componentDidMount() {
		setTimeout(() => { 
			$("#username").focus();
			this.bindEvents();
		}, 10)
	} 

	render() {
		return ( 
		<div className="row">
		    <div className="col s12">
            	<form action="/login" method="post">
		        <div className="card">
		            <div className="card-content">
                    		<div className='section'></div>
		            		<div className='row'>
	            				<TextBox
	            					width="s12"
	            					name='host'
	            					label='Host'
	            					defaultValue={this.props.host}
	            					icon='language'
	            					selectOnFocus={true}
            					/>
		            		</div>
		            		<div className='row'>
		            			<TextBox
		            				width='s12'
		            				name='username'
		            				label='Username'
	            					selectOnFocus={true}
		            				icon='account_circle' />
		            		</div>
		            		<div className='row'>
		            			<TextBox
		            				width='s12'
		            				name='password'
		            				label='Password'
		            				type='password'
	            					selectOnFocus={true}
		            				icon='https' />
		            		</div>
	            			<div className='center-align'>
				            	<a href='https://www.visualstudio.com/en-us/integrate/get-started/auth/overview' target="_blank">
				            		What the heck do I log in with?!
				            	</a>
			            	</div>
		            </div>
		            <div className='card-action center-align'>
						<button type='submit' className="z-depth-0 waves-effect waves-light btn-large">
							Login
						</button>
		            </div>
		        </div>
            	</form>

		    </div>
		</div>
		);
	}
}