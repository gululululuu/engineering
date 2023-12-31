var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var studentsRouter = require('./routes/students');
var loginRouter = require('./routes/login');
var stu_coursesRouter = require('./routes/stu_course');
var tea_coursesRouter = require('./routes/tea_course');
var tea_stuRouter = require('./routes/tea-stu');
var teaEvaluationsRouter = require('./routes/teaEvaluations')
var aimsRouter = require('./routes/aims')
var relationsRouter = require('./routes/relations')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter)
app.use('/courses', coursesRouter)
app.use('/login', loginRouter)
app.use('/stu_course', stu_coursesRouter)
app.use('/tea_course', tea_coursesRouter)
app.use('/teaEvaluation', teaEvaluationsRouter)
app.use('/aims', aimsRouter)
app.use('/relations', relationsRouter)
app.use('/tea_stu', tea_stuRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
