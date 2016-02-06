
var api = {};

var projectsApi = {}

projectsApi.getAll = () => {
	return $.getJSON("/api/projects")
		.then(result => {
			result.value = result.value.sort((a, b) => {
				return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
			})
			return result.value;
		})
}

var tasksApi = {};

tasksApi.getMyTasks = (proj) => $.getJSON("/api/myTasks?project=" + proj)
tasksApi.getMyRecentDone = (proj) => $.getJSON("/api/myrecentdone?project=" + proj)

export { projectsApi }
export { tasksApi }