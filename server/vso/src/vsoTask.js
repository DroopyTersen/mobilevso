var WorkItem = require("./workItem");
var VsoProject = require("./VsoProject");
var VsoTask = function(ctx, id) {
	this._ctx = ctx;
	this.id = id;
	this.baseUrl = `/_apis/wit/workitems/${id}?api-version=1.0`
};

VsoTask.prototype.update = function(updates) {
	return this._ctx.patchJSON(this.baseUrl, updates)
			.then(data => {
				var item = new WorkItem(data)
				return item;
			});
};

//sets to current iteration of passed in project
VsoTask.prototype.setIteration = function(project) {
	var self = this;
	var vsoProject = new VsoProject(this._ctx, project)
	// If no path is passed, use the current iteration
	return vsoProject.currentIteration()
		.then(iteration => {
			var updates = [{
				"op": "add",
				"path": "/fields/System.IterationPath",
				"value": iteration.path
			}];
			return self.update(updates);
		})
		.catch(err => {
			console.log(err);	
		});		
};

VsoTask.prototype.setState = function(state) {
	var updates = [{
		"op": "add",
		"path": "/fields/System.State",
		"value": state
	}];
	return this.update(updates);
};
module.exports = VsoTask;