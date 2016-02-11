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

api.getTeamMembers = function(user, proj) {
   var project = connectToVso(user).projects(proj)
   return project.teamMembers();
};
api.getBurndown = function(user, proj, cb) {
    return connectToVso(user).projects(proj).getBurndown(cb);
};

api.getRecentDone = function(user, project, displayName) {
	var vso = connectToVso(user)
	var project = vso.projects(decodeURIComponent(project))
	
	var request = displayName ? project.recentDone(displayName) : project.myRecentDone();
	return request.then(tasks => tasks.length > 20 ? tasks.slice(0,19) : tasks);
};

api.getOpenTasks = function(user, project, displayName) {
	var vso = connectToVso(user)
	var project = vso.projects(decodeURIComponent(project))
	
	var request = displayName ? project.openTasks(displayName) : project.myOpenTasks();
	return request.then(tasks => tasks.length > 20 ? tasks.slice(0,19) : tasks);
};

api.getProjects = (user) => connectToVso(user).projects()

module.exports = api;