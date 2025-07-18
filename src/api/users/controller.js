const { User } = require('../../database/models');

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
    users: items,
    totalPages,
    currentPage,
    next: nextPage ? `/api/${entity}?page=${nextPage}&size=${limit}` : null,
    previous: previousPage ? `/api/${entity}?page=${previousPage}&size=${limit}` : null
  };
}

const getAllUsers = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'name', 'lastname', 'email'],
    });

    const response = getPagingData({ count, rows }, page, limit, "users");
    const formattedUsers = rows.map(user => ({
      ...user.get({ plain: true }),
      detail: `/api/users/${user.id}`,
    }));

    res.json({
      ...response,
      users: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['created_at', 'updated_at', 'password', 'type'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const userData = user.get({ plain: true });
    userData.image = userData.avatar ? `/images/users/${userData.avatar}` : null;

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getPagination,
  getPagingData
};
