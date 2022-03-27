var createError = require('http-errors'); // sunucuda bir hata oluşturğunda hataları yakalamak için bu middleware kullanırız.
// middleware sayesinde uygulamaya yeni özellikler kazandırırız.
var express = require('express'); // uygulamaya express framework ile çalışma bütün web isteklerin express framework ile karşılama özelliği kazandırdık.
var path = require('path'); // sunucu tarafındaki dosya dizinlerini okumak için nodejs path library kullandık.
var cookieParser = require('cookie-parser'); // her web isteğinde tarayıcıda kullanıcıya ait bilgileri okuyabilmek için cookie-parser denilen bir paket yüklenmiştir.
var logger = require('morgan'); // loglama işlemi yapan bir paket.
var MongoClient = require('mongodb').MongoClient // npm i mongodb
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors') // cors cross origin request sharing demek yani farklı domainler arası kaynak paylaşımı paketi. bir api uygulaması yaptığımızda 2 farklı uygulamayı farklı domainler altından farklı portlar altından çıkardığımızda yani api 5000 reactjs ise 3000 farklı domainler olmuş oluyor. Bu durumda browser 2 farklı domain arasında kaynak paylaşımını kapamış oluyor. buna Cors policy ismi veririz. npm i cors paketi ile bu özelliği api da arkadaşın aşağıdaki gibi ayarlaması lazım.

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); // express gelen isteklerin json formatına dönüştürmek için kullanılan ara middleware  json formatında veri yakalamak için.
app.use(express.urlencoded({ extended: false })); // formdan veri yakalamak için
app.use(cookieParser()); // cookie okumak için
app.use(express.static(path.join(__dirname, 'public'))); // assets klasörüne denk gelir.

app.use('/', indexRouter); // uygulamaya gelen istekleri yakalamamız sağlayan routelarımız 
app.use('/users', usersRouter);


// mongodb bağlantısı mongodb://127.0.0.1:27017 local mongodb adresi
MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {

  const db = client.db('mydb'); // database bağlantısı eğer db yoksa kendisi otomatik olarak bu isimde bir dibi açar.


  if (err) throw err

  // db içerisinde tablomuz colletion oluyor.
  db.collection('users').find().toArray((err, result) => {

    // result ise birden fazla document döndürür.
    console.log('users', result);

    if (err) throw err

    console.log(result)
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // logger.log('istek başarılı'); // react yada angular console.log() aynısını burada morgan denilen bir paket üzerinden yapıyoruz.
  next(createError(404));
});

// error handler uygulamada bir hata varsa server 500 hata kodu döndürmesi için yazılan bir fonksiyon.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); // 500 hata kodu fırlat demek.
  // express js eğer sonuç olarak bir json döndürmeyip bir sayfa döndürecek isek bunyu render ile yapıyoruz. render function içerisine pug dosyasının ismin yazıyoruz.
  res.render('error'); // error pug dosyasını çalıştır demek
});

module.exports = app; // app.js dosyasının başka js dosyalarında okunabilmesi için module.exports keyword kullanırız.


//https://northwind.vercel.app/api/customers
//https://northwind.vercel.app/api/products
//https://northwind.vercel.app/api/categories
//https://northwind.vercel.app/api/suppliers
//https://northwind.vercel.app/api/orders

// https://rapidapi.com/blog/lp/imdb-api/?utm_source=google&utm_medium=cpc&utm_campaign=Alpha&utm_term=imdb%20api_e&gclid=CjwKCAjwloCSBhAeEiwA3hVo_Z4Wcv7VpL3RIUnngWQYiu7hDmwrzta9FBcK3ImGQYY9PagYN9KkORoCdNgQAvD_BwE

// imdb api üzerinden filmler çekip ekranda gösterebiliriz.

// https://jsonplaceholder.typicode.com/



