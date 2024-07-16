// src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const AddProduct = () => {
  const navigate = useNavigate();
  const { dispatch } = useProductContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
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
        dispatch({ type: 'ADD_PRODUCT', payload: data });
        navigate('/');
      });
  };

  return (
    <div className='container'> 
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
      <button type="submit">Create</button>
    </form>
    </div>
  );
};

export default AddProduct;
