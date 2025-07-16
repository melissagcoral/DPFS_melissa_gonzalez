authMiddleware = (req, res, next) => {
  // Hacer que la información del usuario esté disponible en todas las vistas
    res.locals.userLogged = req.session.userLogged || null;
    res.locals.isLoggedIn = !!req.session.userLogged;
    
    next();
};

module.exports = authMiddleware;
