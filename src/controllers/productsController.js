let db = require('../database/models');
const { Op } = require('sequelize');

let productsController = {
    index(req, res) {
        if (req.query.search || req.query.category || req.query.price || req.query.sort) {
            return this.search(req, res);
        }

        Promise.all([
            db.Product.findAll({
                include: [
                    {
                        model: db.ProductCategory,
                        as: 'productCategory'
                    }
                ],
                order: [['name', 'ASC']]
            }),
            db.ProductCategory.findAll(),
            db.User.findByPk(1)
        ])
            .then(function ([productos, categorias, usuario]) {
                return res.render('products/index', {
                    title: 'Todos los productos',
                    productos: productos || [], 
                    categorias: categorias || [], 
                    user: usuario || null
                });
            })
            .catch(function (error) {
                console.log('Error al cargar productos:', error);
                return res.render('products/index', {
                    title: 'Error al cargar productos',
                    productos: [],
                    categorias: [],
                    user: usuario || null,
                    error: 'No se pudieron cargar los productos'
                });
            });
    },
    create(req, res) {
        Promise.all([
            db.ProductCategory.findAll(),
        ])
            .then(function ([categorias]) {
                return res.render('products/new', {
                    title: 'Nuevo producto',
                    categories: categorias,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    detail(req, res) {
        Promise.all([
            db.Product.findByPk(req.params.id, {
                include: [{ association: 'productCategory' }]
            })
        ])
            .then(function ([producto]) {
                res.render('products/detail', { product: producto, title: 'Detalle del producto' });
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    store(req, res) {
        try {
            const { name, price, description, category_id } = req.body;

            if (!name || !price || !category_id) {
                return res.status(400).send('Los campos nombre, precio y categoría son obligatorios');
            }

            if (!req.file) {
                return res.status(400).json({
                    error: 'La imagen es obligatoria'
                });
            }

            let producto = {
                name: name,
                price: parseFloat(price),
                image_url: "/images/products/" + req.file.filename,
                description: description || '',
                image_alt: name || '',
                thumbnail_url: "/images/products/thumbnails/" + req.file.filename,//TODO: MINIMIZAR IMAGEN ANTES DE GUARDAR EN THUMBNAILS
                category: parseInt(category_id)
            }

            db.Product.create(producto)
                .then(function (newProduct) {
                    res.redirect('/products?success=Producto creado exitosamente');
                })
                .catch(function (e) {
                    console.error('Error al crear producto:', e);
                    res.status(500).json({
                        error: 'Error al crear el producto',
                        details: error.message
                    });
                })
        } catch (error) {
            console.error('Error en store:', error);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        }
    },
    search(req, res) {
        const { search, category, price, sort } = req.query;
        let whereConditions = {};
        let orderConditions = [];

        if (search && search.trim() !== '') {
            const searchTerm = search.trim();

            // Para PostgreSQL, usar iLike es más eficiente
            whereConditions[Op.or] = [
                {
                    name: {
                        [Op.iLike]: `%${searchTerm}%`
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${searchTerm}%`
                    }
                }
            ];
        }

        //por categoria
        let includeConditions = [
            {
                model: db.ProductCategory,
                as: 'productCategory'
            }
        ];

        if (category && category !== '') {
            includeConditions[0].where = {
                name: category
            };
        }

        //order
        switch (sort) {
            case 'name':
                orderConditions = [['name', 'ASC']];
                break;
            case 'price':
                if (price === 'high') {
                    orderConditions = [['price', 'DESC']];
                } else {
                    orderConditions = [['price', 'ASC']];
                }
                break;
            case 'newest':
                orderConditions = [['created_at', 'DESC']];
                break;
            default:
                orderConditions = [['name', 'ASC']];
        }

        // si no hay ordenamiento por precio pero hay filtro de precio
        if (price && sort !== 'price') {
            if (price === 'high') {
                orderConditions = [['price', 'DESC']];
            } else if (price === 'low') {
                orderConditions = [['price', 'ASC']];
            }
        }

        Promise.all([
            db.Product.findAll({
                where: whereConditions,
                include: includeConditions,
                order: orderConditions
            }),
            db.ProductCategory.findAll(),
            db.User.findByPk(1)
        ])
            .then(function ([productos, categorias, usuario]) {
                // Construir título dinámico
                let title = 'Productos';
                if (search) title = `Resultados de búsqueda`;
                if (category) title += ` - Categoría: ${category}`;

                return res.render('products/index', {
                    title: title,
                    productos: productos || [], // Asegurar que siempre sea un array
                    categorias: categorias || [], // Asegurar que siempre sea un array
                    searchTerm: search || '',
                    selectedCategory: category || '',
                    priceFilter: price || '',
                    sortBy: sort || 'name',
                    user: usuario || req.session.user || null
                });
            })
            .catch(function (error) {
                console.log('Error en búsqueda/filtrado:', error);
                // En caso de error, cargar solo las categorías y productos vacíos
                db.ProductCategory.findAll(),
                    db.User.findByPk(1)
                        .then(function (categorias, usuario) {
                            return res.render('products/index', {
                                title: 'Error en la búsqueda',
                                productos: [], // Array vacío en caso de error
                                categorias: categorias || [],
                                searchTerm: search || '',
                                selectedCategory: category || '',
                                priceFilter: price || '',
                                sortBy: sort || 'name',
                                user: usuario || req.session.user || null,
                                error: 'Error en la búsqueda'
                            });
                        })
                        .catch(function (err) {
                            // Si hasta las categorías fallan
                            return res.render('products/index', {
                                title: 'Error del sistema',
                                productos: [],
                                categorias: [],
                                user: null,
                                error: 'Error del sistema'
                            });
                        });
            });

    },
    edit(req, res) {
        Promise.all([
            db.Product.findByPk(req.params.id),
            db.ProductCategory.findAll(),
        ])
            .then(function ([producto, categorias]) {
                //if (!producto) return res.status(404).send('Producto no encontrado');
                if (!producto) return res.status(404).render('error', { mensaje: 'Producto no encontrado' });
                return res.render('products/edit', {
                    title: 'Editar producto',
                    product: producto,
                    categories: categorias
                });
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send('Error al cargar el producto');
            });
    },
    save(req, res) {
        try {
            const productId = req.params.id;
            const { name, price, description, category_id } = req.body;

            // Buscar el producto existente
            db.Product.findByPk(productId)
                .then(function (product) {
                    if (!product) {
                        return res.status(404).json({
                            error: 'Producto no encontrado'
                        });
                    }

                    // Preparar datos
                    let updateData = {
                        name: name,
                        price: parseFloat(price),
                        description: description || '',
                        category_id: parseInt(category_id)
                    };

                    // Si se subió una nueva imagen, actualizar también la imagen
                    if (req.file) {
                        updateData.image_url = req.file.filename;
                    }

                    // Actualizar el producto
                    return product.update(updateData);
                })
                .then(function (updatedProduct) {
                    // Redirigir con mensaje de éxito
                    res.redirect('/products?success=Producto actualizado exitosamente');
                })
                .catch(function (error) {
                    console.error('Error al actualizar producto:', error);
                    res.status(500).json({
                        error: 'Error al actualizar el producto',
                        details: error.message
                    });
                });

        } catch (error) {
            console.error('Error en save:', error);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        }
    },
    delete(req, res) {
        db.Product.destroy({
            where: { id: req.params.id }
        }).then(function () {
            return res.redirect('/products?success=Producto eliminado exitosamente')
        })
            .catch(function (e) {
                console.log(e);
            })
    }
}


module.exports = productsController