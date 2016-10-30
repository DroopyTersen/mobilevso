var path 			= require('path');
var express 		= require('express');
var webpack 		= require('webpack');
var cookieParser 	= require('cookie-parser');
var bodyParser   	= require('body-parser');
var session      	= require('express-session');
var passport 		= require('passport');

var config 			= require('./webpack.config.prod');
var createRoutes 	= require("./server/router").createRoutes;
var setupPassport 	= require("./server/passport").setupPassport;

var app 		= express();
var compiler 	= webpack(config);
var port 		= process.env.PORT || 3000;
var host 		= process.env.IP;


//AUTHENTICATION 
setupPassport(passport);
app.use(bodyParser()); 
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({ secret: 'shhhhhhh' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

createRoutes(app, passport);
app.use("/static", express.static('dist'));


app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
