const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Configuracion de EJS y Layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts); // usar layouts

// Establecer layout por defecto
app.set('layout', './layouts/layout'); 


// Middlewares globales
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Rutas auxiliares (login, logout, register)
app.get('/login', (req, res) => {
  res.render('users/login', { title: 'Login' });
});

app.get('/logout', (req, res) => {
  // req.session.destroy()
  res.redirect('/login?logout=1');
});

app.get('/register', (req, res) => {
  res.render('users/register', { title: 'Registro' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// manejador de error 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { mensaje: err.message });
});

module.exports = app;
