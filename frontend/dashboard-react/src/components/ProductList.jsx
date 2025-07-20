const ProductList = ({ products }) => {
  if (!products || products.length === 0) return <p>No hay productos disponibles.</p>;
  
  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este producto?')) {
      await fetch(`http://localhost:4000/api/products/${id}`, { method: 'DELETE' });
      alert('Producto eliminado');
      location.reload(); 
    }
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-dark text-white">
        Listado de productos
      </div>
      <ul className="list-group list-group-flush">
        {products.map(p => (
          <li key={p.id} className="list-group-item">
            <strong>{p.name}</strong> 
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;