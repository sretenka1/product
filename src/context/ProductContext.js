// src/context/ProductContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProductContext = createContext();

const initialState = {
  items: [],
  searchQuery: '',
  categories: [],
  currentPage: 1,
  totalPages: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        totalPages: action.payload.totalPages,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      const limit = 10;
      const skip = (state.currentPage - 1) * limit;
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      dispatch({
        type: 'SET_ITEMS',
        payload: {
          items: data.products,
          totalPages: Math.ceil(data.total / limit),
        },
      });
    };
    fetchProducts();
  }, [state.currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      dispatch({ type: 'SET_CATEGORIES', payload: data });
    };
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
