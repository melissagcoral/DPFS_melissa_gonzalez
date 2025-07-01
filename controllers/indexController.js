let productos = [
    {
        id: '6e3879f0-ca68-4b2d-9c5b-2fe6890c071e',
        nombre: "Crema Facial Hidratante",
        descripcion: "Hidrata y revitaliza tu piel con ingredientes naturales.",
        precio: "150.000",
        imagen: "/images/hidratante.jpg"
    },
    {
        id: '2d19ca00-320e-4aae-8551-ee044da26ad5',
        nombre: "Serum Glow Up",
        descripcion: "Ilumina y unifica el tono de tu piel con nuestro serum estrella.",
        precio: "250.000",
        imagen: "/images/serum.jpg"
    },
    {
        id: '0c7d3845-22c9-4a98-a1d3-7cc4f554b175',
        nombre: "Mascarilla Refrescante",
        descripcion: "Relaja tu piel con extractos botánicos refrescantes.",
        precio: "50.000",
        imagen: "/images/mascarilla.jpg"
    }
];

let indexController = {
    index: function (req, res) {
        res.render('index', { title: 'Glow Up', productos: productos });
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
        const products = JSON.parse(localStorage.getItem("products")) || [];
        if (products.length === 0) {
            return res.render('cart', { title: 'Carrito', mensaje: 'No hay productos en el carrito' });
        }
        res.render('cart', { title: 'Carrito', cart: products });
    },
    error: function (req, res) {
        res.status(404).render('error', { mensaje: 'Página no encontrada' });
    }
}

module.exports = indexController;