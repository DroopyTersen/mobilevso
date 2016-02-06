import React from 'react';
import TextBox from '../inputs/textBox';
import TaskButtons from './taskButtons'
import { tasksApi } from '../../data/api';
import { notify } from '../../utils'
import ConfirmationModal from '../modals/confirmationModal'

export default class TaskBody extends React.Component {
	constructor(props) {
		super(props);
		this.changeRemaining = this.changeRemaining.bind(this);
		this.setIteration = this.setIteration.bind(this);
	}
	handleError() {
		console.log(arguments);
		notify.error("ERROR: Something went wrong :( ")
	}
	changeRemaining(hours) {
		if (this.props.task.state === "Done" || this.props.task.remaining + "" === hours + "") {
			return false;
		} 
		tasksApi.setRemaining(this.props.task, hours)
			.then(newTask => {
				notify.success(`Success: Remaining hours changed to <b>${hours}</b>`)
			})
			.fail(handleError)
	}

	setIteration() {
		if (this.props.task.state === "Done") return false;
		tasksApi.setIteration(this.props.task)
			.then(newTask => {
				$("#iteration-" + newTask.id).html(newTask.iteration);
				notify.success(`Success: Moved task to current iteration`)
			})
			.fail(handleError)
	}

	renderIteration(task) {
		if (task.state === "Done") {
			return (
				<div className='task-iteration row'>
					<i className="material-icons col s1 grey-text">today</i>
					<span className='col s11'>{task.iteration}</span>
				</div>

			);
		}
		return (
			<div className='task-iteration row'>
				<i onClick={() => $("#confirm-modal-" + this.props.task.id).openModal()}
				className="waves-effect material-icons col s1 blue-text">today</i>
				<span id={'iteration-' + this.props.task.id} className='col s11'>
					{task.iteration}
				</span>
			</div>
		);
	}
	render() {
		var task = this.props.task;
		return (
			<div className='collapsible-body task-body'>
				<h5 className='teal-text task-title'>{task.title}</h5>
				<div className='divider' />
				<div className='section task-path'>{task.path}</div>

					{this.renderIteration(task)}
 
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
							disabled={task.state === "Done"}
							/>
					</span>

				</div>
				<div className='divider' />
				<TaskButtons task={task} />
				<ConfirmationModal 
					onConfirm={this.setIteration} 
					header='Move task to current iteration?'
					name={ 'confirm-modal-' + task.id }
					/>
			</div>
		);
	}
}
