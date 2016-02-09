exports.getEntries = function (env) {
	var entries = [
		"login", "mytasks", "projects", "loginhelp", "iterationstats", "teammate", "help"
	]

	var entry = {};
	entries.forEach(view  => {
		entry[view] = [ "./client/views/" + view ];

		// add hot loading
		if(env === "dev") {
			entry[view].unshift('eventsource-polyfill', 'webpack-hot-middleware/client');
		} 
	});

	return entry;
};