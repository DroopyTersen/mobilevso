import React from 'react';
require("./burndownChart.css")
import { loading } from "../../utils/"

export default class BurndownChart extends React.Component {
	componentDidMount() {
		var proj = this.props.project;
		var url = `/api/burndown?projectId=${proj.id}&projectName=${proj.name}`
		loading.start();
		$.get(url).then(resp => {
			var $img =$("#burndown-chart");
			$img[0].src = resp;
			$img.fadeIn();
			loading.stop();
		})
	}
	render() {
		return (
			<div className="row">
        		<div className="col s12">
          			<div className="card">
            			<div className="card-image">
              				<img id='burndown-chart' src="/" style={{display:"none"}}/>
        				</div>
          			</div>
        		</div>
      		</div>
		);
	}
}
