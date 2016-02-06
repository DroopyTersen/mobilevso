var notify = {};

var _toast = function(content, classes) {
	var $html = $(`<span>${content}</span>`);
	Materialize.toast($html, 3000, 'center-align ' + classes) 
}

notify.success = function(content) {
	_toast(content, "teal")
}
notify.error = function(content) {
	_toast(content, "red darken-3")
}
notify.info = function(content) {
	_toast(content, "blue accent-3")
}

export default notify;