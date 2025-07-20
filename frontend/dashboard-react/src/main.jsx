import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
  </BrowserRouter>
);
