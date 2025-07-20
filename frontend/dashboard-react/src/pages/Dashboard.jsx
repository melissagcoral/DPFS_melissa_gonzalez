import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import LastItem from '../components/LastItem';
import CategoryPanel from '../components/CategoryPanel';
import ProductList from '../components/ProductList';
import { fetchProducts, fetchUsers } from '../services/api';

const Dashboard = () => {
  const [productData, setProductData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProductData);
    fetchUsers().then(setUserData);
  }, []);

  if (!productData || !userData) return <div className="text-center my-5">Cargando...</div>;

  const { count, countByCategory, products } = productData;
  const lastProduct = products[products.length - 1];

  const categories = Object.entries(countByCategory).map(([catId, total]) => {
    const category = products.find(p => p.category[0]?.id.toString() === catId)?.category[0];
    return {
      name: category?.name || `Categoría ${catId}`,
      total: Number(total)
    };
  });

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Panel de Administración</h1>

      {/* Barra de navegación */}
      <div className="btn-group" role="group">
        <Link to="/" className="btn btn-outline-primary">
          <i className="fas fa-home"></i> Dashboard
        </Link>
        <Link to="/create" className="btn btn-outline-success">
          <i className="fas fa-plus"></i> Crear Producto
        </Link>
      </div>

      {/* Paneles principales */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <Card title="Total de Productos" value={count} />
        </div>
        <div className="col-md-4">
          <Card title="Total de Usuarios" value={userData.count} />
        </div>
        <div className="col-md-4">
          <Card title="Total de Categorías" value={categories.length} />
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/create" className="btn btn-success">
                  <i className="fas fa-plus-circle"></i> Agregar Producto
                </Link>
                <button className="btn btn-info" onClick={() => window.location.reload()}>
                  <i className="fas fa-sync"></i> Actualizar Datos
                </button>
                <Link to="/categories" className="btn btn-secondary">
                  <i className="fas fa-tags"></i> Gestionar Categorías
                </Link>
                <Link to="/users" className="btn btn-warning">
                  <i className="fas fa-users"></i> Gestionar Usuarios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Último producto */}
      <div className="row mb-4">
        <div className="col">
          {lastProduct && <LastItem item={{ ...lastProduct, type: 'producto' }} />}
        </div>
      </div>

      {/* Categorías */}
      <div className="row mb-4">
        <div className="col">
          <CategoryPanel categories={categories} />
        </div>
      </div>

      {/* Lista de productos */}
      <div className="row">
        <div className="col">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
