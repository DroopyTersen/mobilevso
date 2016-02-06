import React from 'react';
import { render } from 'react-dom';

import { projectsApi } from '../data/api';
import { getSettings, updateProject } from '../data/settings';
import Header from '../components/header'
import ProjectsList from '../components/projectsList'
import SearchFab from '../components/inputs/searchFab'
import { loading } from '../utils'
class ProjectsPage extends React.Component {
	constructor(props) {
		super(props);
		var settings = getSettings();
		this.state = {
			allProjects: [],
			projects: [],
			currentProject: settings.project || { name: "" }
		}
		this.search = this.search.bind(this);
		this.updateProject = this.updateProject.bind(this);
	}

	updateProject(newProject) {
		loading.start();
		var settings = updateProject(newProject);
		this.setState({ currentProject: settings.project });
		setTimeout(() => window.location.href = "/mytasks", 500)
		
	}

	search(value) {
		value = value.toLowerCase();
		var projects = this.state.allProjects;
		if (value) {
			projects = projects.filter(p => p.name.toLowerCase().indexOf(value) > -1 );
		}
		this.setState({ projects })
	}

	componentWillMount() {
		projectsApi.getAll().then( projects => {
			console.log(projects);
			this.setState({ allProjects:projects, projects })
		})
	}

	render() {
		return (
			<div className='view mytasks'>
				<Header name='My App' />
				<ProjectsList
					currentProject={this.state.currentProject}
					selectProject={this.updateProject}
					projects={this.state.projects} />
				<SearchFab handleChange={this.search} delay={200} />
			</div>
		);
	}
}
render(<ProjectsPage />, document.getElementById('root'));
