import React from 'react';
import TextBox from '../inputs/textBox';
import TaskButtons from './taskButtons'

export default class TaskBody extends React.Component {
	changeRemaining(hours) {
		console.log(hours);
	}
	render() {
		var task = this.props.task;
		return (
			<div className='collapsible-body task-body'>
				<h5 className='teal-text task-title'>{task.title}</h5>
				<div className='divider' />
				<div className='section task-path'>{task.path}</div>

				<div className='task-iteration row'>
					<i className="material-icons col s1">today</i>
					<span className='col s11'>{task.iteration}</span>
				</div>

				<div className='task-info row'>
					<span className='col s6 left-align'>
						State:<b style={{"font-size": "1.3em"}}> {task.state}</b>
					</span>

					<span className='remaining col s6'>
						<TextBox
							width="s12"
							icon='schedule'
							defaultValue={task.remaining}
							label='Remaining hours'
							name={'remaining-' + task.id}
							type='number'
							onBlur={this.changeRemaining}
							/>
					</span>

				</div>
				<div className='divider' />
				<TaskButtons task={task} />
			</div>
		);
	}
}
