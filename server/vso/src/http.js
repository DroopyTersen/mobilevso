var request = require("request-promise");

var getRequestOptions = function(url, authHash) {
	var options = {
		url: url,
		headers: {
			"Authorization": "Basic " + authHash,
			"Accept": "application/json"
		},
		json: true
	};
	return options;
};

exports.get = function(url, authHash) {
	return request.get(getRequestOptions(url, authHash));
};

exports.post = function(url, authHash, body) {
	var options = getRequestOptions(url, authHash);
	options.body = body;
	options.method = "POST";
	return request(options);
};

//Not using 'json:true' option so need to stringify and parse JSON
exports.patch = function(url, authHash, body) {
	var options = {
		url: url,
		headers: {
			"Authorization": "Basic " + authHash,
			"Accept": "application/json",
			"Content-Type": "application/json-patch+json"
		},
		method: "PATCH",
		body: JSON.stringify(body)
	};
	return request(options).then(res => JSON.parse(res));
}
