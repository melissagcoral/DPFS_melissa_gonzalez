const { v4: uuidv4 } = require('uuid');

let productos = [
    {
        id: '6e3879f0-ca68-4b2d-9c5b-2fe6890c071e',
        nombre: "Crema Facial Hidratante",
        categoria: "Cuidado Facial",
        descripcion: "Hidrata y revitaliza tu piel con ingredientes naturales.",
        precio: "150.000",
        imagen: "/images/hidratante.jpg"
    },
    {
        id: '2d19ca00-320e-4aae-8551-ee044da26ad5',
        nombre: "Serum Glow Up",
        categoria: "Cuidado Facial",
        descripcion: "Ilumina y unifica el tono de tu piel con nuestro serum estrella.",
        precio: "250.000",
        imagen: "/images/serum.jpg"
    },
    {
        id: '0c7d3845-22c9-4a98-a1d3-7cc4f554b175',
        nombre: "Mascarilla Refrescante",
        categoria: "Cuidado Facial",
        descripcion: "Relaja tu piel con extractos botánicos refrescantes.",
        precio: "50.000",
        imagen: "/images/mascarilla.jpg"
    }
];

let categorias = [
    { id: '002d4fbc-0535-4c0d-b3f3-f8de711e5178', nombre: 'Cuidado Facial' }, { id: '00a14c55-19ef-4c36-8a4d-51cab3140cc1', nombre: 'Cuidado Corporal' }, { id: '01edde29-9539-4bcb-b94d-568a08a79638', nombre: 'Maquillaje' }, { id: '03ebd516-3ae6-48f7-9a4d-e4c38b7c2ca7', nombre: 'Cuidado del Cabello' }, { id: '040d91c5-2228-464e-b337-5a1ac96c07d0', nombre: 'Fragancias' }
];

let user = {
    nombre: 'Meli',
    email: '',
    role: 'admin',
};

let productsController = {
    index: function (req, res) {
        res.render('products/index', { title: 'Productos', productos: productos, categorias: categorias, user: user });
    },
    create: function (req, res) {
        res.render('products/new', { title: 'Nuevo producto' });
    },
    detail: function (req, res) {
        const product = productos.find(p => p.id == req.params.id);
        console.log(req.params.id);
        console.log(product);

        if (!product) return res.status(404).render('error', { mensaje: 'Producto no encontrado' });
        //if (!product) return res.status(404).send('Producto no encontrado');
        res.render('products/detail', { product: product, /*title: product.nombre*/ });
    },
    store: function (req, res) {
        const { nombre, precio, imagen, descripcion } = req.body;

        if (!nombre || !precio || !imagen || !descripcion) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const id = uuidv4(); // Generar un ID único para el nuevo producto
        productos.push({ id, nombre, descripcion, precio, imagen });
        res.redirect('/products');
    },
    search: function (req, res) {
        let searchTerm = req.query.search
        return res.render('products/index', { title: 'Resultados de búsqueda', searchTerm })
    },
    edit: function (req, res) {
        const producto = productos.find(p => p.id == req.params.id);
        //if (!product) return res.status(404).send('Producto no encontrado');
        res.render('products/edit', { title: 'Editar producto', producto });
    },
    save: function (req, res) {
        const { id, nombre, precio, imagen, descripcion } = req.body;
        const productIndex = productos.findIndex(p => p.id == id);
        //if (productIndex === -1) return res.status(404).send('Producto no encontrado');

        productos[productIndex] = { id, nombre, precio, imagen, descripcion };
        res.redirect('/products');
    },
    delete: function (req, res) {
        const productIndex = productos.findIndex(p => p.id == req.params.id);
        //if (productIndex === -1) return res.status(404).send('Producto no encontrado');

        productos.splice(productIndex, 1);
        res.redirect('/products');
    }
}


module.exports = productsController