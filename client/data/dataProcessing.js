
export function filterTasks(value, allTasks) {
	if (value) {
		value = value.toLowerCase();
		var filterFunc = task => {
			var compareStr = (task.path + task.title).toLowerCase();
			return compareStr.indexOf(value) > -1
		}
		var tasks = Object.assign({}, allTasks);
		tasks["To Do"] = tasks["To Do"].filter(filterFunc);
		tasks["In Progress"] = tasks["In Progress"].filter(filterFunc);
		tasks["Done"] = tasks["Done"].filter(filterFunc);
		return tasks;
	} else {
		return Object.assign({}, allTasks)
	}
}

export function refreshTask(newTask, allTasks) {
	var tasks = Object.assign({}, allTasks);
	var oldTaskIndex = -1;
	// Find the old one the old one
	// For each key (state) check if there is a matching task
	for (var state of Object.keys(tasks)) {
		oldTaskIndex = tasks[state].findIndex(t => t.id === newTask.id);
		//if a task was found join its props with the new task and then remove it from that state's array
		if (oldTaskIndex > -1) {
			var oldTask = tasks[state][oldTaskIndex];
			tasks[state][oldTaskIndex] = Object.assign({}, oldTask, newTask);
			break;
		}
	}
	return tasks;
}

export function switchState(newTask, allTasks) {
	var tasks = Object.assign({}, allTasks);
	console.log(newTask);
	var oldTask = null;
	// Remove the old one
	// For each key (state) check if there is a matching task
	for (var state of Object.keys(tasks)) {
		oldTask = tasks[state].find(t => t.id === newTask.id);
		//if a task was found join its props with the new task and then remove it from that state's array
		if (oldTask) {
			newTask = Object.assign({}, oldTask, newTask);
			tasks[state] = tasks[state].filter(t => t.id !== newTask.id);
		}
	}
	// insert it at top of the new state
	if (tasks[newTask.state]) {
		tasks[newTask.state] = [newTask, ...tasks[newTask.state]];		
	}
	return tasks;
}