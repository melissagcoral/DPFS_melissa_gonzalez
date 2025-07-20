import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-chart-bar"></i> Admin Panel
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                <i className="fas fa-home"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/create') ? 'active' : ''}`} 
                to="/create"
              >
                <i className="fas fa-plus"></i> Crear Producto
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-cog"></i> Más
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    <i className="fas fa-tags"></i> Categorías
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/users">
                    <i className="fas fa-users"></i> Usuarios
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/settings">
                    <i className="fas fa-cog"></i> Configuración
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;