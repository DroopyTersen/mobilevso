var WorkItem = require("./workItem");
var queries = require('./queries');
var _ = require("lodash");
var data = require('./data');

var VsoProject = function(ctx, project) {
    this.name = (typeof project === "string") ? project : project.name;
	this._ctx = ctx;
    if (project.id) this.id = project.id;
	this.idUrl = `/_apis/projects/${project.id}`;
	this.id = project.id;
	this.queryUrl = `/${this.name}/_apis/wit/wiql?api-version=1.0`
};

VsoProject.prototype.query = function(wiqlStr) {
	var self = this;
	return this._ctx.postJSON(this.queryUrl, { query: wiqlStr })
		.then(data.workItems.mapIds)
		.then(self._ctx.getItems.bind(self))
		.then(data.workItems.mapToObj)
		.then(data.workItems.setPath);
};

VsoProject.prototype._getOpenTasks = function(wiql) {
	return this.query(wiql)
		.then(workItems => {
			return _.chain(workItems)
					.filter(item => item.workItemType === "Task" || item.workItemType === "Bug")
					.groupBy("state")
					.value();	
		})
        .catch(error => console.log(error.stack));
};

VsoProject.prototype.openTasks = function(displayName) {
	return this._getOpenTasks(queries.openTasks(displayName))
};

VsoProject.prototype.myOpenTasks = function() {
	return this._getOpenTasks(queries.myOpenTasks)
};

VsoProject.prototype.teams = function() {
    var url = this.idUrl + "/teams?$top=500";
    console.log(url);
    return this._ctx.getJSON(url).then(data => {
        console.log(data);
        data.value
    });
};

VsoProject.prototype.getMainTeam = function() {
    var url = this.idUrl //+ "/teams"
    return this._ctx.getJSON(url).then(proj => {
        return  proj.defaultTeam
    });
}
VsoProject.prototype.teamMembers = function() {
   return this.getMainTeam().then(team => {
       var url = team.url + "/members?$top=1000"
       console.log(url);
       return this._ctx.getJSON(url).then(data => { 
            var users = data.value.filter(t => !t.isContainer)
            users.sort((a,b) => a.displayName < b.displayName ? -1 : 1 )
            return users;
       });
   }) 
}

VsoProject.prototype._getDoneTasks = function(wiql) {
	return this.query(wiql)
		.then(workItems => {
			return _.chain(workItems)
					.filter(item => item.workItemType === "Task")
					.sortBy("closedDate")
					.reverse()
					.groupBy("state")
					.value();	
		});
}

VsoProject.prototype.myRecentDone = function() { 
	return this._getDoneTasks(queries.myRecentDone) 
}
VsoProject.prototype.recentDone = function(displayName) {
	return this._getDoneTasks(queries.recentDone(displayName))
}

VsoProject.prototype.getBurndown = function(cb) {
	return this.currentIteration().then(iteration => {
		var chartOptions= `chartOptions={"Width":600,"Height":400,"ShowDetails":true,"Title":"${iteration.name}"}`
		var iterationPath = encodeURIComponent(iteration.path.replace(/\\\\/g, "\\"));
		var url = `/${this.id}/_api/_teamChart/Burndown?${chartOptions}&counter=2&iterationPath=${iterationPath}`
        return this._ctx.getImage(url, cb)
	})
};

VsoProject.prototype.currentIteration = function() {
	var url = `/${this.name}/_apis/work/teamsettings/iterations?$timeframe=current&api-version=v2.0`;
	return this._ctx.getJSON(url).then(data => data.value[0]);
}

module.exports = VsoProject;