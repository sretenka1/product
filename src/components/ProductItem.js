// src/components/ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Swal from 'sweetalert2';

const ProductItem = ({ product }) => {
  const { dispatch } = useProductContext();

  const deleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dummyjson.com/products/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then(() => {
            dispatch({ type: 'DELETE_PRODUCT', payload: id });
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
          });
      }
    });
  };

  return (
    <div className="product-card" key={product.id}>
    <img src={product.thumbnail} alt={product.title} />
    <h3>{product.title}</h3>
    <p className="price">${product.price.toFixed(2)}</p>
    <p>{product.description.length > 60 ? `${product.description.slice(0, 60)}...` : product.description}</p>
    <div className="actions">
      <Link className="view" to={`/product/${product.id}`}>View</Link>
      <Link className="edit" to={`/product/edit/${product.id}`}>Edit</Link>
      <button className="delete" onClick={() => deleteProduct(product.id)}>Delete</button>
    </div>
  </div>
  );
};

export default ProductItem;
