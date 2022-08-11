var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var bedrockRouter = require('./routes/bedrock');
var javaRouter = require('./routes/Java');

var app = express();

var allowCrossDomain = function (req, res, next) {
  // 所有的接口都可以访问
  res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
  res.header('Access-Control-Allow-Headers', '*');//自定义中间件，设置跨域需要的响应头。
  res.header('X-Powered-By','Lition');
  next();
}
app.use(allowCrossDomain); // 使中间件生效

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/je', javaRouter);
app.use('/be',bedrockRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.json({
    code: 404
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
