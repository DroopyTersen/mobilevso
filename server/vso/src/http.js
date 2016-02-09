var request = require("request-promise");
var requestOriginal = require("request");

var getRequestOptions = function(url, authHash, isJson) {
	isJson = isJson === false ? false : true;
	var options = {
		url: url,
		headers: {
			"Authorization": "Basic " + authHash,
			"Accept": "application/json"
		},
		json: isJson
	};
	return options;
};

exports.get = function(url, authHash, isJson) {
	return request.get(getRequestOptions(url, authHash, isJson));
};

exports.getImage = function(url, authHash, cb) {
	var options = {
		url: url,
		headers: {
			"Authorization": "Basic " + authHash,
			"Accept": "application/json"
		},
		encoding: null
	};

	requestOriginal(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
	        cb(data);
	    }
	});

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
