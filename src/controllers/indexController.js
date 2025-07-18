let db = require('../database/models');

let indexController = {
    index: function (req, res) {
        Promise.all([
            db.ProductCategory.findAll({
            where: {
                id: [2, 3, 6]
            }
        }),
        ])
        .then(function ([categorias]) {
            console.log(categorias);
                return res.render('index', {
                    title: 'Glow Up',
                    productos: categorias || [], 
                });
            })
            .catch(function (error) {
                console.log('Error al cargar categorias:', error);
                return res.render('index', {
                    title: 'Error al cargar categorías',
                    productos: [],
                    error: 'No se pudieron cargar las categorías'
                });
            });
    },
    about: function (req, res) {
        res.render('about', { title: 'Nosotros' });
    },
    terms: function (req, res) {
        res.render('terms', { title: 'Términos y Condiciones' });
    },
    faq: function (req, res) {
        res.render('faq', { title: 'Preguntas Frecuentes' });
    },
    cart: function (req, res) {
        const products = req.session.cart || [];
        console.log(products)
        if (products.length === 0) {
            return res.render('cart', { title: 'Carrito', mensaje: 'No hay productos en el carrito', cart: [] });
        }
        res.render('cart', { title: 'Carrito', cart: products });
    },
    error: function (req, res) {
        res.status(404).render('error', { mensaje: 'Página no encontrada' });
    }
}

module.exports = indexController;