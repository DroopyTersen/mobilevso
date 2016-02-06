var path = require('path');
var express = require('express');
var config = require('../webpack.config.prod');
var webpack = require('webpack');
var router = require("./router");

var app = express();
var compiler = webpack(config);


app.use('/static', express.static('dist'));
app.use('/static', express.static('css'));

router.setup(app);

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
