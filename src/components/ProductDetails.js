// src/components/ProductDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const ProductDetails = () => {
  const { state } = useProductContext();
  const { id } = useParams();
  const product = state.items.find(item => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <Link to="/" className="back-button">Back</Link>
      <div className="product-details">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-meta">
            <span className="product-category">Category: {product.category}</span>
            <span className="product-stock">Stock: {product.stock > 100 ? 'Sale' : product.stock > 0 ? 'Available' : 'Not available'}</span>
            <span className="product-rating">Rating: {product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
