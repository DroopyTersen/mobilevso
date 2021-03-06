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

projectsApi.getTeammates = (proj) => {
	return $.getJSON(`/api/teammates?projectId=${proj.id}&projectName=${proj.name}`)
}

var tasksApi = {};

tasksApi.getOpenTasks = (proj, user = "") => _getJSON(`/api/opentasks?project=${proj}&name=${user}`)
tasksApi.getRecentDone = (proj, user = "") => $.getJSON(`/api/recentdone?project=${proj}&name=${user}`)

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