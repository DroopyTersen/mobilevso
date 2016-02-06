var loading = {};
loading.start = function(msg = "LOADING") {
	var html = `
		<div id='loader' style='width:100%'>
			<div>${msg}</div>
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		</div>
	`;
	Materialize.toast($(html), 200000, 'center-align')
};
loading.stop = function() {
	$("#loader").closest(".toast").remove();
}

export default loading;