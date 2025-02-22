import axios from 'axios';

import {
  productSchema,
  NewProduct,
  productArraySchema,
  cartItemArraySchema,
  addToCartReturnDataSchema,
} from '../types';

const BASE_URL = '/api';


const getProducts = async (abortController: AbortController) => {
  const response = await axios.get(`${BASE_URL}/products`, abortController);
  return productArraySchema.parse(response.data);
};

const createProduct = async (productDetails: NewProduct) => {
  const response = await axios.post(`${BASE_URL}/products`, productDetails);
  return productSchema.parse(response.data);
};

const editProduct = async (id: string, updatedProductInfo: NewProduct) => {
  const response = await axios.put(`${BASE_URL}/products/${id}`, updatedProductInfo);
  return productSchema.parse(response.data);
};

const deleteProduct = async (idOfProduct: string) => {
  await axios.delete(`${BASE_URL}/products/${idOfProduct}`);
  return null;
};

const getCartItems = async (abortController: AbortController) => {
  const response = await axios.get(`${BASE_URL}/cart`, abortController);
  return cartItemArraySchema.parse(response.data);
};

const checkout = async () => {
  await axios.post(`${BASE_URL}/checkout`);
  return null;
};

const addToCart = async (productId: string) => {
  const response = await axios.post(`${BASE_URL}/add-to-cart`, {productId});
  return addToCartReturnDataSchema.parse(response.data);
}

export default {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getCartItems,
  checkout,
  addToCart
};