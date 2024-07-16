// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await response.json();
      setResults(data.products);
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>
      <div className="dashboard">
        {results.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p>{product.description.length > 60 ? `${product.description.slice(0, 60)}...` : product.description}</p>
            <div className="actions">
              <Link className="view" to={`/product/${product.id}`}>View</Link>
              <Link className="edit" to={`/product/edit/${product.id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
