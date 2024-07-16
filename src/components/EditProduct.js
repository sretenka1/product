// src/components/EditProduct.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useProductContext();
  const product = state.items.find(item => item.id === parseInt(id));
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        price,
        category,
      }),
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'UPDATE_PRODUCT', payload: data });
        navigate('/');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditProduct;
