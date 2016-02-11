exports.getMarkup = function(view) {
	return `
		<!doctype html>
		<html>
		  <head>
  			<title>Mobile VSO</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
		  	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
  			<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/css/select2.css' >
  			<script src='https://code.jquery.com/jquery-2.2.0.min.js'></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
		  	<script src='https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.js'></script>
		  	<script src='https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min.js'></script>
		  	<script src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.2.1/lodash.min.js'></script>
		  	<script src='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js'></script>
		  </head>
		  <body>
		    <div id="root"></div>

		    <script src="/static/${view}.js"></script>
		  </body>
		</html>
	`;
}
