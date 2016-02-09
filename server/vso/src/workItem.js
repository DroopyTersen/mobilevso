var WorkItem = function(apiObj) {
	this.workItemType = apiObj.fields["System.WorkItemType"];
	this.id = apiObj.id;
	this.project = apiObj.fields["System.AreaLevel1"];
	this.area = apiObj.fields["System.NodeName"];
	this.iteration = apiObj.fields["System.IterationPath"];
	this.state = apiObj.fields["System.State"];
	this.asignedTo = apiObj.fields["System.AssignedTo"];
	this.title = apiObj.fields["System.Title"];
	this.priority = apiObj.fields["Microsoft.VSTS.Common.Priority"];
	this.children = getChildren(apiObj);
	this.parent = getParent(apiObj);
	this.remaining = apiObj.fields['Microsoft.VSTS.Scheduling.RemainingWork'] || "?";
	this.closedDate = apiObj.fields['Microsoft.VSTS.Common.ClosedDate'];

	mapStates(this);
};

var mapStates = function(workItem) {
	if (workItem.state === "New") workItem.state = "To Do";
	else if (workItem.state === "Committed") workItem.state = "In Progress";
	else if (workItem.state === "Approved") workItem.state = "In Progress";
}
var getChildren = function(apiObj) {
	var ids = apiObj.relations
				.filter(r => r.rel === "System.LinkTypes.Hierarchy-Forward")
				.map(r => {
					return {
						url: r.url,
						id: r.url.substring(r.url.lastIndexOf("/") + 1)
					};
				});
	return ids;
};

var getParent = function(apiObj) {
	var ids = apiObj.relations
				.filter(r => r.rel === "System.LinkTypes.Hierarchy-Reverse")
				.map(r => {
					return {
						url: r.url,	
						id: r.url.substring(r.url.lastIndexOf("/") + 1)
					};
				});
	return ids.length ? ids[0] : null;
};
module.exports = WorkItem;