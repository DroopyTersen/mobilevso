var api = {};
var vsoFactory = require('./vso');

var connectToVso = user => vsoFactory.create(user.authHash, user.host)

api.setTaskIteration = function(authHash, id, project) {
	var vso = vsoFactory.create(authHash);
	return vso.tasks(id).setIteration(project)
};

api.setTaskState = function(authHash, id, state) {
	var vso = vsoFactory.create(authHash);
	return vso.tasks(id).setState(state)
}

api.getMyTasks = function(user, project) {
	var vso = connectToVso(user)
	var project = vso.projects(decodeURIComponent(project))
	
	return project.myOpenTasks();
}; 

api.getMyRecentDone = function(user, project) {
	var vso = connectToVso(user)
	var project = vso.projects(decodeURIComponent(project))
	
	return project.myRecentDone();
}; 

api.getProjects = (user) => connectToVso(user).projects()

module.exports = api;