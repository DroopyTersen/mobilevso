import React from 'react';
import { debounce } from 'lodash'
import { getSettings } from '../../data/settings'
import { projectsApi } from '../../data/api'
import { loading } from '../../utils'

require("./peoplePicker.css")
export default class PeoplePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teammates: []
		}
	}

	handlePersonChange(e) { 
		var newUser = $("#peoplepicker").val();
		if (this.props.onChange) this.props.onChange(newUser);
	}

	initSelect2() {
		var self = this;
		$("#peoplepicker").select2({
		  placeholder: "Choose a user...",
		})
		$("#peoplepicker").on("change", this.handlePersonChange.bind(this));
		loading.stop();
	}

	componentDidMount() {
		loading.start();
		var settings = getSettings()
		if (settings.project && settings.project.id) {
			projectsApi.getTeammates(settings.project)
				.then(teammates => {
					return this.setState({ teammates })
				})
				.then(this.initSelect2.bind(this))
		}
	}

	render() {
		var options = this.state.teammates.map(u => {
			return <option value={u.displayName}>{u.displayName}</option>
		});
		return (
		<div className="peoplepicker-footer">
      		<div className="container">
            	<div className="row">
			        <div className="input-field col s12 white-text">
			          <select onChange={this.handleChange} id="peoplepicker" className='browser-default'>
			          <option value=''>Choose a user...</option>
			          {options}
			          </select>
			        </div>
          		</div>
          	</div>
        </div>
		);
	}
}
