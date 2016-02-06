import React from 'react';
require("./projects.css")

import { getSettings } from '../../data/settings'

export default class ProjectsList extends React.Component {

	constructor(props) {
    	super(props);
    	this.selectProject = this.selectProject.bind(this);
    	this.scrolled = false;
	}

	selectProject(e) {
		var elem = e.currentTarget;
		var id = elem.attributes["data-id"].value;
		var name = elem.attributes["data-name"].value;
		if (this.props.selectProject) {
			this.props.selectProject({ name, id });
		}
	}

	scrollToSelected() {
		if (!this.scrolled && this.props.currentProject && this.props.currentProject.id) {
			setTimeout(() => {
				var target = $("#" + this.props.currentProject.id).offset().top - 200;
				$("body").scrollTop(target)
				this.scrolled = true;
			}, 1)
		}
	}
	render() {
		var self = this;
		var getIcon = function(project) {
			return self.props.currentProject.name === project.name 
							? <i className="material-icons circle green">turned_in</i>
							: <i className="material-icons circle">turned_in_not</i>
		};
		this.scrollToSelected();
		var projectsMarkup = this.props.projects.map(project => {
			return (
				<li className='collection-item avatar' id={project.id} data-id={project.id} data-name={project.name} onClick={this.selectProject}>
					{getIcon(project)}
					<span className='title'>{project.name}</span>
					<p>{project.description}</p>
				</li>
			);
		})
		return ( 
		<ul className='collection with-header'>
			<li className='collection-header teal white-text'>
				<span>Showing {this.props.projects.length} Projects...</span>
			</li>
	    	{projectsMarkup}
		</ul>

		);
	}
}