const db = require('../../database/models');

function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
}

function getPagingData(data, page, limit, entity) {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const previousPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    count: totalItems,
    countByCategory: null,
    products: items,
    totalPages,
    currentPage,
    next: nextPage ? `/api/${entity}?page=${nextPage}&size=${limit}` : null,
    previous: previousPage ? `/api/${entity}?page=${previousPage}&size=${limit}` : null
  };
}

const getAllProducts = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const { count, rows } = await db.Product.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'name', 'description', 'category'],
      include: [{ model: db.ProductCategory, as: 'productCategory', attributes: ['id', 'name'] }],
    });

    const countByCategory = await db.Product.findAll({
      attributes: ['category', [db.Sequelize.fn('COUNT', db.Sequelize.col('category')), 'count']],
      group: ['category'],
      raw: true
    });

    const formattedCountByCategory = {};
    countByCategory.forEach(item => {
      formattedCountByCategory[item.category] = item.count;
    });

    const response = getPagingData({ count, rows }, page, limit, "products");
    const formattedProducts = rows.map(product => {
      const plain = product.get({ plain: true });
      return {
        id: plain.id,
        name: plain.name,
        description: plain.description,
        category: plain.productCategory ? [{ id: plain.productCategory.id, name: plain.productCategory.name }] : [],
        detail: `/api/products/${plain.id}`
      };
    });

    res.json({
      ...response,
      countByCategory: formattedCountByCategory,
      products: formattedProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id, {
      attributes: { exclude: ['image', 'created_at', 'updated_at'] }, // excluimos campos sensibles
      include: [{ model: db.ProductCategory, as: 'productCategory', attributes: ['id', 'name'] }],
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productData = product.get({ plain: true });
    return res.json({
      id: productData.id,
      name: productData.name,
      description: productData.description,
      category: productData.productCategory ? [{ id: productData.productCategory.id, name: productData.productCategory.name }] : [],
      price: productData.price,
      image_url: productData.image_url,
      image_alt: productData.image_alt,
      thumbnail_url: productData.thumbnail_url,
      detail: `/api/products/${productData.id}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  getPagination,
  getPagingData
};