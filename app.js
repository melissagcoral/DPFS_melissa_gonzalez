const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const session = require("express-session");
const port = process.env.PORT || 3002;

const sessionMiddleware = require("./src/middlewares/sessionMiddleware");
const sessionTimeMiddleware = require("./src/middlewares/sessionTimeMiddleware");

const app = express();

require("dotenv").config();

// Configuracion de EJS y Layouts
app.set('views', path.join(__dirname, 'src/views'));
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
app.use(
  session({ secret: "es un secreto", resave: false, saveUninitialized: true })
);

// esto es un middleware de tiempo de session
app.use(sessionMiddleware);
app.use(sessionTimeMiddleware);

// Rutas
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/products', productsRouter);

app.use((req, res, next) => {
    console.log(`🔍 ${req.method} ${req.url}`);
    if (req.method === 'POST') {
        console.log('📦 POST Body:', req.body);
    }
    next();
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

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
