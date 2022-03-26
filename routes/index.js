var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // pug dosyasına göndereceğimiz değerleri, aşağıdaki gibi pub dosyasının yanında obje olarak dinamik bir şekilde gönderebiliriz.
  res.render('index', { title: 'Express38ıyıhasd9' });
});

module.exports = router;
// nodemon npm start komutu ile çalıştırırız sunucu üzerinde bir güncelleme olduğunda nodemon otomatik olarak sunucu restart eder.