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
        return res.render("users/register", { title: 'Registrarme' });
    },
    register: async function (req, res) {
        try {
            //validar los datos
            const errors = validationResult(req);

            //si hay errores, retornarlos a la vista
            if (!errors.isEmpty()) {
                const mappedErrors = errors.mapped();
                return res.render("users/register", {
                    title: "Registrarme",
                    errors: mappedErrors,
                    olds: req.body
                });
            }

            let data = {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                avatar: req.file ? req.file.filename : 'default-avatar.svg',
                password: bcryptjs.hashSync(req.body.password, 10),
            };

            //guarda el usuario en base de datos
            let newUser = await db.User.create(data);

            // logear al usuario en session
            req.session.userLogged = newUser;
            console.log('🎫 Usuario guardado en sesión y redirigiendo al perfil');

            //redirigimos a menu de usuario
            return res.redirect(`/profile`);
        } catch (error) {
            // Manejo de errores de la base de datos
            console.error('💥 ERROR EN REGISTRO:', error);
            console.error('📍 Stack trace:', error.stack);

            return res.render("users/register", {
                title: "Registrarme",
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
        console.log('👤 Accediendo al perfil del usuario:', req.session.userLogged);
        return res.render("users/profile", {
            title: 'Mi Perfil',
            user: req.session.userLogged
        });
    },
    edit: function (req, res) {
        Promise.all([
            db.User.findByPk(req.session.userLogged.id),
            db.User.findAll({
                attributes: ['type'],
                group: ['type'] // Para obtener valores únicos
            })
        ])
            .then(function ([usuario, userTypes]) {
                if (!usuario) return res.status(404).render("users/edit", {
                    title: 'Editar Perfil',
                    user: usuario,
                    userTypes: []
                });

                // Extraer solo los valores de type
                const types = userTypes.map(user => user.type);

                return res.render("users/edit", {
                    title: 'Editar Perfil',
                    user: usuario,
                    userTypes: types // Pasamos los tipos disponibles
                });
            })
            .catch(function (error) {
                console.log(error);
                return res.status(500).send('Error al cargar el usuario');
            });
    },
    save: function (req, res) {
        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            let errors = errores.mapped();
            console.log('❌ Errores de validación en edit user:', errors);

            const userFailed = {
                id: req.session.userLogged.id,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                type: req.body.type,
                avatar: req.session.userLogged.avatar
            };
            return res.render("users/edit", {
                errors: errors,
                user: userFailed,
                userTypes: ['Usuario', 'Administrador']
            });
        }

        let data = {};

        if (req.body.name && req.body.name.trim() !== '') {
            data.name = req.body.name.trim();
        }

        if (req.body.lastname && req.body.lastname.trim() !== '') {
            data.lastname = req.body.lastname.trim();
        }

        if (req.body.email && req.body.email.trim() !== '') {
            data.email = req.body.email.trim();
        }

        if (req.body.type && req.body.type.trim() !== '') {
            data.type = req.body.type.trim();
        }

        if (req.file && req.file.filename) {
            data.avatar = req.file.filename;
        }

        console.log('📝 Datos a actualizar:', data);
        // Actualizar el usuario en la base de datos
        db.User.update(data, {
            where: { id: req.session.userLogged.id }
        })
            .then(() => {
                console.log('✅ Usuario actualizado correctamente');
                // Actualizar la sesión con los nuevos datos
                req.session.userLogged = { ...req.session.userLogged, ...data };
                return res.redirect('/profile');
            }).catch(error => {
                console.log(error);
                res.status(500).send('Error al actualizar usuario');
            });

    }
};

module.exports = usersController;