import { useState } from 'react';

const CreateProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', categoryId: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (response.ok) alert('Producto creado con éxito');
    else alert('Error al crear el producto');
    setForm({ name: '', description: '', categoryId: '' }); 
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
         <h2 className="mb-4">Crear nuevo producto</h2>
        <input name="name" placeholder="Nombre" onChange={handleChange} />
        <input name="description" placeholder="Descripción" onChange={handleChange} />
        <input name="categoryId" placeholder="ID Categoría" onChange={handleChange} />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateProduct;
