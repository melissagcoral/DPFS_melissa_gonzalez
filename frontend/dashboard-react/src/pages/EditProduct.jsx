import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:4000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    alert('Producto actualizado');
  };

  if (!form) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar producto</h2>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="description" value={form.description} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EditProduct;
