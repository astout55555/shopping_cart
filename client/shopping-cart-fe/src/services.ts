import axios from 'axios';

import {
  ProductType,
  NewProduct,
  CartItemType,
  AddToCartReturnData
} from './types';

const BASE_URL = 'http://localhost:3001/api/';

const getProducts = async () => {
  const response = await axios.get<ProductType[]>(`${BASE_URL}/products`);
  return response.data;
};

const createProduct = async (productDetails: NewProduct) => {
  const response = await axios.post<ProductType>(`${BASE_URL}/products`, productDetails);
  return response.data;
};

const editProduct = async (id: string, updatedProductInfo: NewProduct) => {
  const response = await axios.put<ProductType>(`${BASE_URL}/products/${id}`, updatedProductInfo);
  return response.data;
};

const deleteProduct = async (idOfProduct: string) => {
  const response = await axios.delete<null>(`${BASE_URL}/products/${idOfProduct}`);
  return response.data;
};

const getCartItems = async () => {
  const response = await axios.get<CartItemType[]>(`${BASE_URL}/cart`);
  return response.data;
};

const checkout = async () => {
  const response = await axios.post<null>(`${BASE_URL}/checkout`);
  return response.data;
};

const addToCart = async (productId: string) => {
  const response = await axios.post<AddToCartReturnData>(`${BASE_URL}/add-to-cart`, {productId});
  return response.data;
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