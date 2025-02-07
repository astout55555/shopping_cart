import axios from 'axios';

import {
  ProductType,
  NewProduct,
} from './types';

const BASE_URL = 'http://localhost:3001/api/'

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
  return response;
}

export default {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct
};