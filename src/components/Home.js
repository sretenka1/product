// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const Home = () => {
  const { state, dispatch } = useProductContext();

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  const handleSearch = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const searchQuery = state.searchQuery ? state.searchQuery.toLowerCase() : '';

  const filteredItems = state.items.filter(item =>
    item.title && item.title.toLowerCase().includes(searchQuery)
  );

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1>Product Store</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={state.searchQuery}
          onChange={handleSearch}
          style={{ marginRight: '20px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <Link to={`/search/${state.searchQuery}`} style={{background: "white", color: "blue",padding:5,borderRadius:20, textDecoration:"none"}}>Search</Link>
        <Link to="/product/add">Add Product</Link>
        
      </div>
      <div className="dashboard">
        {state.items.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p>{product.description.length > 60 ? `${product.description.slice(0, 60)}...` : product.description}</p>
            <div className="actions">
              <Link className="view" to={`/product/${product.id}`}>View</Link>
              <Link className="edit" to={`/product/edit/${product.id}`}>Edit</Link>
              <button className="delete" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: state.totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${state.currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
