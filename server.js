'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// link the app... .js
app.use(require('./appPost.js'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
