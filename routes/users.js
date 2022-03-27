var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

/* GET users listing. */
// users endpoint
router.get('/', function(req, res, next) {
  // router.get bizim http get ile istekleri aldığımız function



  MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

    // mongo üzerinden mydb bağlandık
    const db = client.db('mydb');

    if (err) throw err
  
    // mydb üzerinden de users kolleksiyonuna bağlandık.
    db.collection('users').find().toArray((err, result) => {
  
  

      // hata varsa hata fırlattık
      if (err) throw err;
  
      // hata yoksa users collectiondaki değerleri json formatında döndürdük.
      res.json(result);
      
    })
  })
  

  });


// users/create endpoint
// httpPost isteği
router.post('/create',function(req,res,next) {

  // req.body üzerinden json olarak bir document nesnesi göndeririz.

  MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

    const db = client.db('mydb');


    // user collectiona kayıt olarak gir.
    db.collection('users').insertOne(req.body,(err, result) => {
  
      console.log('req-body', req.body);
      console.log('create-user-result', result)

      // hata varsa hata fırlattık
      if (err) throw err;
  
      // hata yoksa users collectiondaki değerleri json formatında döndürdük.
      res.status(201); // api de kayıt oluşturduğumuzda 201 created result döneriz.

      
    })

  });

  console.log('user-create-json', req.body);

  res.json(req.body);
});

module.exports = router;
