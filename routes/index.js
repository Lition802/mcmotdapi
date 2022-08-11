var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
      code:200,
      bedrock:"/be?host=xxxx&port=xxxx",
      java:'/je?host=xxxx&port=xxxx'
  });
});

module.exports = router;
