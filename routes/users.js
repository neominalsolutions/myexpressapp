var express = require('express');
var router = express.Router();

/* GET users listing. */
// users endpoint
router.get('/', function(req, res, next) {
  // router.get bizim http get ile istekleri aldığımız function

  // req => request
  // res => response karşılık gelir.

  // json result döndürerken res.json
  res.json([
    {
      name:"ali"
    },
    {
      name:'ayşe'
    },
    {
      name:'erhan'
    },
    {
      name:'burhan'
    }
  ]);

  // res.send('respond with a resource');
});

// users/create endpoint
// httpPost isteği
router.post('/create',function(req,res,next) {

  console.log('user-create-json', req.body);

  res.json(req.body);
});

module.exports = router;
