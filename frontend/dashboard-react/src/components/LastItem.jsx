const LastItem = ({ item }) => {
  if (!item) return null;

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        Último {item.type} agregado
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        {item.description && <p className="card-text">{item.description}</p>}
        {item.image && (
          <img src={item.image} alt={item.name} className="img-fluid rounded" />
        )}
      </div>
    </div>
  );
};

export default LastItem;
