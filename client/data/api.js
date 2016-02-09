import { loading } from '../utils/'
var api = {};

var _getJSON = function(url, loadingMsg) {
	loading.start(loadingMsg);
	return $.getJSON(url)
		.then(results => {
			loading.stop();
			return results;
		})
		.fail(() => loading.stop());
}

var projectsApi = {}

projectsApi.getAll = () => {
	return _getJSON("/api/projects")
		.then(result => {
			result.value = result.value.sort((a, b) => {
				return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
			})
			return result.value;
		})
}


var tasksApi = {};

tasksApi.getMyTasks = (proj) => _getJSON("/api/myTasks?project=" + proj)
tasksApi.getMyRecentDone = (proj) => $.getJSON("/api/myrecentdone?project=" + proj)

tasksApi.setState = function(task, state) {
	if (task.workItemType === "Bug" && state === "In Progress") state = "Committed";
	return _getJSON(`/api/tasks/${task.id}/setState/${state}`, "SAVING")
			.then(updatedTask => Object.assign({}, task, updatedTask));
};

tasksApi.setRemaining = function(task, remaining) {
	return _getJSON(`/api/tasks/${task.id}/setRemaining/${remaining}`, "SAVING")
			.then(updatedTask => Object.assign({}, task, updatedTask));
};

tasksApi.setIteration = function(task) {
	return _getJSON(`/api/tasks/${task.id}/setIteration/${task.project}`, "SAVING")
			.then(updatedTask => Object.assign({}, task, updatedTask));
};

export { projectsApi }
export { tasksApi }