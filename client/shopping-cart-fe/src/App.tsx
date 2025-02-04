import './App.css';
import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductForm from './components/AddProductForm';

import {
  mockProducts,
  mockCart,
} from './mockData/data.js';

import {
  ProductType,
} from './types';

const App = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [cartItems, setCartItems] = useState<ProductType[]>(mockCart);
  const [products, setProducts] = useState<ProductType[]>(mockProducts);

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <>
      <header>
        <Cart cartItems={cartItems} />
      </header>
      <ProductList products={products} />
      <p>
        <button className="add-product-button" onClick={toggleVisibility}>
          {formVisible ? "Cancel" : "Add A Product"}
        </button>
      </p>
      {formVisible && <AddProductForm />}
    </>
  )
}

export default App
