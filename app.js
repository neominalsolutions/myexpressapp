var createError = require('http-errors'); // sunucuda bir hata oluşturğunda hataları yakalamak için bu middleware kullanırız.
// middleware sayesinde uygulamaya yeni özellikler kazandırırız.
var express = require('express'); // uygulamaya express framework ile çalışma bütün web isteklerin express framework ile karşılama özelliği kazandırdık.
var path = require('path'); // sunucu tarafındaki dosya dizinlerini okumak için nodejs path library kullandık.
var cookieParser = require('cookie-parser'); // her web isteğinde tarayıcıda kullanıcıya ait bilgileri okuyabilmek için cookie-parser denilen bir paket yüklenmiştir.
var logger = require('morgan'); // loglama işlemi yapan bir paket.

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
