var WorkItem = require('./workItem');

var data = {};
data.workItems = {};

data.workItems.mapIds = function(data) {
	var ids = [];
	if (data.workItemRelations) {
		ids = data.workItemRelations.map(w => w.target.id);
	} else if (data.workItems) {
		ids = data.workItems.map(w => w.id);
	}
	return ids;
};

data.workItems.mapToObj = function(data) {
	var workItems = {};
	data.value.forEach(result => {
		var workItem = new WorkItem(result);
		workItems[workItem.id + ""] = workItem;
	})
	return workItems;
};

var recursiveGetPath = function(workItem, workItems) {
	var path = workItem.title;
	if (workItem.parent && workItem.parent.id) {
		var parentItem = workItems[workItem.parent.id];
		if (parentItem) {
			path = recursiveGetPath(parentItem, workItems) + " / " + path;
		}
	}
	return path;
};

data.workItems.setPath = function(workItems) {
	var ids = Object.keys(workItems);
	ids.forEach(id => {
		workItems[id].path = recursiveGetPath(workItems[id], workItems)
							.replace(workItems[id].title, "").trim()
							.replace(/\/$/, "")
							.trim(); // get rid of last slash
	})
	return workItems;
};

module.exports = data;