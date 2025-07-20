const CategoryPanel = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white">
        Productos por categoría
      </div>
      <ul className="list-group list-group-flush">
        {categories.map((cat, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <span>{cat.name}</span>
            <span className="badge bg-secondary">{cat.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPanel;
