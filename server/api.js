var api = {};
var vsoFactory = require('./vso');

var connectToVso = user => vsoFactory.create(user.authHash, user.host)

api.setTaskIteration = function(user, id, project) {
	var vso = connectToVso(user);
	return vso.tasks(id).setIteration(project)
};

api.setTaskState = function(user, id, state) {
	var vso = connectToVso(user);
	return vso.tasks(id).setState(state)
}

api.setTaskRemaining = function(user, id, remaining) {
	var vso = connectToVso(user);
	return vso.tasks(id).setRemaining(remaining)
}

api.getMyTasks = function(user, project) {
	var vso = connectToVso(user)
	var project = vso.projects(decodeURIComponent(project))
	
	return project.myOpenTasks();
}; 

api.getMyRecentDone = function(user, project) {
	var vso = connectToVso(user)
	var project = vso.projects(decodeURIComponent(project))
	
	return project.myRecentDone().then(tasks => tasks.length > 20 ? tasks.slice(0,19) : tasks);
}; 

api.getProjects = (user) => connectToVso(user).projects()

module.exports = api;