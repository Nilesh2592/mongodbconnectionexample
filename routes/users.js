var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://e17a1ce70ab7/node_test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource' + mongoose);
});

module.exports = router;
