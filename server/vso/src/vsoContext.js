var request = require("request-promise");
var VsoProject = require("./vsoProject");
var VsoTask = require("./vsoTask");
var http = require('./http');

var create = function(authHash, host) {
    host = host || "skyline.visualstudio.com"
	var _authHash = authHash;
	var vsoContext = {};
    var _baseUrl = `https://${host}/defaultcollection`;
	
	// base api methods to manually hit any VSO endpoint
	vsoContext.getJSON = (path) => http.get(_baseUrl + path, _authHash);
	vsoContext.postJSON = (path, body) => http.post(_baseUrl + path, _authHash, body);
	vsoContext.patchJSON = (path, body) => http.patch(_baseUrl + path, _authHash, body);
	vsoContext.tasks = (id) => new VsoTask(vsoContext, id);

	// you should be passing this to constructor so this really shouldn't be necessary
	vsoContext.setAuthHash = (authHash) => _authHash = authHash;
	vsoContext.projects = function(name) {
		// If a name isn't passed, return a promise for a list of projects
		if (!name) {
			return vsoContext.getJSON("/_apis/projects?$top=1000");
		} else {
			// A name was passed so return a new project obj with all it's methods
			return new VsoProject(vsoContext, name); 
		}
	};

	// Get items (any type across any project) by Id
	vsoContext.getItems = function(ids) {
		var url = "/_apis/wit/workitems?$expand=all&ids=" + ids.join(",");
		return vsoContext.getJSON(url);
	};

	//return public methods
	return vsoContext;
};

module.exports = { create };

