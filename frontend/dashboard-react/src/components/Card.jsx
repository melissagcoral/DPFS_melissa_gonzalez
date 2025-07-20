const Card = ({ title, value }) => (
  <div className="card text-center h-100">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text display-6">{value}</p>
    </div>
  </div>
);

export default Card;
