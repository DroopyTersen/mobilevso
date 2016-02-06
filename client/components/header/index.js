import React from 'react';
require("./header.css")
import { getSettings } from '../../data/settings'

export default class Header extends React.Component {

	constructor(props) {
    	super(props);
	}
	componentDidMount() {
		console.log("HERE");
		setTimeout(() => $(".button-collapse").sideNav(), 10);
	}

	renderCurrentProject() {
		var settings = getSettings();
		if (settings.project && settings.project.name) {
			return (
				<li className='project truncate'>{settings.project.name}</li>
			);
		}
		return "";
	}
	render() {

		return ( 
		<div className='navbar-fixed'>

		    <nav>

        		<ul id="slide-out" className="side-nav">
    					<li>
    						<a href="/mytasks">
    							<i className="material-icons left">today</i>
    							My Tasks
							</a>
						</li>
    					<li>
    						<a href="/mytasks">
    							<i className="material-icons left">perm_contact_calendar</i>
    							Check on a teammate
							</a>
						</li>
				</ul>
	        	<div className="nav-wrapper">

  					<ul className='left'>
  						<li>
							<a href="#" data-activates="slide-out" className="button-collapse">
								<i className="mdi-navigation-menu"></i>
							</a>
  						</li>
  					</ul>

		            <a href='#' className="logo center-align">
		            	<span id='logo-mobile'>mobile</span>
		            	<i id='logo-icon' className="material-icons">phonelink_ring</i>
		            	<span id='logo-vso'>VSO.com</span>
	            	</a>

					<ul className="right">
						<li>
							<a id='top-right-menu-btn' 
								href="#" 
								className='dropdown-button' 
								data-activates='top-right-menu'
								data-gutter='10'
								data-alignment='right'
								data-beloworigin="false">
								<i className="material-icons">more_vert</i>
							</a>
		
						</li>
					</ul>
		        </div>
				<ul id='top-right-menu' className='dropdown-content z-depth-2'>
					{this.renderCurrentProject()}
					<li>
						<a href="/projects">
		            		<i className="material-icons right">turned_in</i>
							Switch project
						</a>
					</li>
					<li className="divider"></li>
					<li>
						<a href="/signout">
		            		<i className="material-icons right">lock</i>
							Sign out
						</a>
					</li>
				</ul>
		    </nav>
		    
		</div>

		);
	}
}