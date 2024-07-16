// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import Categories from './components/Categories';
import SearchResults from './components/SearchResults';
import { ProductProvider } from './context/ProductContext';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
