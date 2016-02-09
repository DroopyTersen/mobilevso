import React from 'react';
require("./header.css")
import { getSettings } from '../../data/settings'

export default class Header extends React.Component {

	constructor(props) {
    	super(props);
	}
	componentDidMount() {
		setTimeout(() => $(".button-collapse").sideNav(), 10);
	}

	renderCurrentProject() {
		var settings = getSettings();
		if (settings.project && settings.project.name) {
			return (
				<li data-proj-id={settings.project.id} className='project truncate'>{settings.project.name}</li>
			);
		}
		return "";
	}
	render() {

		return ( 
		<div className='navbar-fixed'>

		    <nav>

        		<ul id="slide-out" className="side-nav">
        				<li className='logo'><span className='teal-text'>mobilevso.com</span></li>
        				<li className='divider'></li>
    					<li>
    						<a href="/mytasks">
    							<i className="material-icons left">today</i>
    							My Tasks
							</a>
						</li>
        				<li className='divider'></li>
    					<li>
    						<a href="/teammate">
    							<i className="material-icons left">perm_contact_calendar</i>
    							Check on a teammate
							</a>
						</li>
        				<li className='divider'></li>
    					<li>
    						<a href="/iterationstats">
    							<i className="material-icons left">trending_down</i>
    							Iteration Stats
							</a>
						</li>
        				<li className='divider'></li>
    					<li>
    						<a href="/help">
    							<i className="material-icons left">live_help</i>
    							Help
							</a>
						</li>
        				<li className='divider'></li>

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