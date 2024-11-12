import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ViewProduct from './pages/ViewProduct';

const AdminProduct = () => {
  return (
    <Routes>
      <Route index element={<ProductList />} />
      <Route path="product-list" element={<ProductList />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="/admin-product/edit-product/:id" element={<EditProduct />} />
      <Route path="/admin-product/view-product/:id" element={<ViewProduct />} />
    </Routes>
  );
};

export default AdminProduct;