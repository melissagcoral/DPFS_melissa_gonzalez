const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const session = require("express-session");

// Carga de variables de entorno (SOLO UNA VEZ en toda la aplicación)
if (!process.env.LOADED_ENV) {
  require('dotenv').config({
    path: path.resolve(__dirname, '.env'),
    override: true,
    debug: process.env.NODE_ENV === 'development'
  });
  process.env.LOADED_ENV = 'true';
}

const sessionMiddleware = require("./src/middlewares/sessionMiddleware");
const sessionTimeMiddleware = require("./src/middlewares/sessionTimeMiddleware");
const authMiddleware = require("./src/middlewares/authMiddleware");

const port = process.env.PORT || 4000;
const app = express();

// Configuracion de EJS y Layouts
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// Establecer layout por defecto
app.set('layout', './layouts/layout');

// app.use((req, res, next) => {
//     console.log(`🔍 ${req.method} ${req.url}`);
//     if (req.method === 'POST' || req.method === 'PUT') {
//         console.log('📦 Body:', req.body);
//     }
//     next();
// });

// Middlewares globales
app.use(logger('dev'));
//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(
  session({ secret: "es un secreto", resave: false, saveUninitialized: true })
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/images/users'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// upload middleware disponible en toda la app
app.locals.upload = upload;

// esto es un middleware de tiempo de session
app.use(sessionMiddleware);
app.use(sessionTimeMiddleware);
app.use(authMiddleware);

// Rutas
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const productsRouter = require('./src/routes/products');

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// manejador de error
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { mensaje: err.message });
});

module.exports = app;
