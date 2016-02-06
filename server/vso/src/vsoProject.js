var WorkItem = require("./workItem");
var queries = require('./queries');
var _ = require("lodash");
var data = require('./data');

var VsoProject = function(ctx, name) {
	this._ctx = ctx;
	this.name = name;
	this.baseUrl = `/${name}/_apis`;
	this.queryUrl = `/${name}/_apis/wit/wiql?api-version=1.0`
};

VsoProject.prototype.query = function(wiqlStr) {
	var self = this;
	return this._ctx.postJSON(this.queryUrl, { query: wiqlStr })
		.then(data.workItems.mapIds)
		.then(self._ctx.getItems.bind(self))
		.then(data.workItems.mapToObj)
		.then(data.workItems.setPath);
};

VsoProject.prototype.myOpenTasks = function() {
	return this.query(queries.myOpenTasks)
		.then(workItems => {
			return _.chain(workItems)
					.filter(item => item.workItemType === "Task")
					.groupBy("state")
					.value();	
		});
};

VsoProject.prototype.myRecentDone = function() {
	return this.query(queries.myRecentDone)
	.then(workItems => {
		return _.chain(workItems)
				.filter(item => item.workItemType === "Task")
				.sortBy("closedDate")
				.reverse()
				.groupBy("state")
				.value();	
	});
};

VsoProject.prototype.currentIteration = function() {
	var url = this.baseUrl + "/work/teamsettings/iterations?$timeframe=current&api-version=v2.0";
	return this._ctx.getJSON(url).then(data => data.value[0]);
}

module.exports = VsoProject;