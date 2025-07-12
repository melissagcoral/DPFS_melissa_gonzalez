const bcryptjs = require("bcryptjs");
const db = require('../database/models');
const { validationResult } = require("express-validator");

const usersController = {
    showLogin: function (req, res) {
        res.render('users/login', { title: 'Iniciar Sesión' });
    },
    login: async function (req, res) {
        //validar los datos
        let errores = validationResult(req);

        //si hay errores, retornarlos a la vista
        if (!errores.isEmpty()) {
            let errors = errores.mapped();
            console.log('❌ Errores de validación en login:', errors);
            return res.render("users/login", { errors: errors, olds: req.body });
        }

        //db
        let user = await db.User.findOne({
            where: {
                email: req.body.email,
            },
        });

        //buscar al usuario
        if (user) {
            let passOk = bcryptjs.compareSync(req.body.password, user.password);
            if (passOk) {
                //si  password es correcto se guarda el ususario en session
                req.session.userLogged = user;
                req.session.lastActitity = Date.now();

                //si recordar usuario esta activado enviamos una cookie con el email
                if (req.body.rememberMe) {
                    res.cookie("userId", user.id, { maxAge: 1000 * 60 * 5 });
                }
                console.log('✅ Login exitoso, redirigiendo a profile');
                //redirigimos al menu de usuario
                return res.redirect("/profile");
            } else {
                console.log('❌ Password incorrecto');
                //si password no es correcta devolvemos el error
                return res.render("users/login", {
                    errors: {
                        password: {
                            msg: "La contraseña o email no es válida.",
                        },
                    },
                    olds: req.body,
                });
            }
        } else {
            console.log('❌ Usuario no encontrado');
            return res.render("users/login", {
                errors: { email: { msg: "No se encontró el usuario", olds: req.body } },
            });
        }
    },
    showRegister: function (req, res) {
        return res.render("users/register", { title: 'Registrarse' });
    },
    register: async function (req, res) {
        try {
            //validar los datos
            let errores = validationResult(req);

            //si hay errores, retornarlos a la vista
            if (!errores.isEmpty()) {
                let errors = errores.mapped();
                return res.render("users/register", { errors: errors, olds: req.body });
            }

            let data = {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                avatar: req.file ? req.file.filename : 'default-avatar.png',
                password: bcryptjs.hashSync(req.body.password, 10),
            };

            //guarda el usuario en base de datos
            let newUser = await db.User.create(data);

            // SE LOGEA EN SESSION
            req.session.userLogged = newUser;
            console.log('🎫 Usuario guardado en sesión y redirigiendo al perfil');

            //redirigimos a menu de usuario
            return res.redirect(`users/profile`, { title: 'Mi Perfil' });
        } catch (error) {
            // Manejo de errores de la base de datos
            console.error('💥 ERROR EN REGISTRO:', error);
            console.error('📍 Stack trace:', error.stack);
            
            return res.render("users/register", {
                errors: {
                    general: {
                        msg: "Error al crear el usuario. Intenta nuevamente."
                    }
                },
                olds: req.body
            });
        }

    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/");
    },
    profile: function (req, res) {
        return res.render("users/profile", { title: 'Mi Perfil' });
    },
};

module.exports = usersController;