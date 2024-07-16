// src/components/Categories.js
import React from 'react';
import { useProductContext } from '../context/ProductContext';

const Categories = () => {
  const { state } = useProductContext();

  return (
    <div className="container">
      <h2>Categories</h2>
      <ul>
        {state.categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
