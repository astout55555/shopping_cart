import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductForm from './components/AddProductForm';
import { ZodError } from 'zod';
import apiService from './services';

import {
  ProductType,
  CartItemType,
  NewProduct
} from './types';

const App = () => {
  const [formVisible, setFormVisible] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItemType[]>([]);
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchProducts(abortController);
    fetchCartItems(abortController);
    return () => {
      abortController.abort();
    }
  }, []);

  const fetchProducts = async (abortController: AbortController) => {
    try {
      const allProducts = await apiService.getProducts(abortController);
      setProducts(allProducts);
    } catch(error) {
      setError(true);
      if (error instanceof ZodError) {
        console.error(error.issues);
      } else {
        console.error(error);
      }
    }
  };

  const fetchCartItems = async (abortController: AbortController) => {
    try {
      const cartItems = await apiService.getCartItems(abortController);
      setCartItems(cartItems);
    } catch(error) {
      setError(true);
      if (error instanceof ZodError) {
        console.error(error.issues);
      } else {
        console.error(error);
      }
    }
  };

  const addItemToCart = async (productId: string) => {
    try {
      const { product, item } = await apiService.addToCart(productId);
      setProducts((prevProducts) => prevProducts.map((prevProduct) => {
        return prevProduct._id === product._id ? product : prevProduct;
      }));
      if (cartItems.map((cartItem) => cartItem.productId).includes(productId)) {
        setCartItems((prevCartItems) => prevCartItems.map((prevCartItem) => {
          return prevCartItem._id === item._id ? item : prevCartItem;
        }));
      } else {
        setCartItems((prevCartItems) => [...prevCartItems, item]);
      }
    } catch(error) {
      setError(true);
      if (error instanceof ZodError) {
        console.error(error.issues);
      } else {
        console.error(error);
      }
    }
  };

  const checkoutCart = async () => {
    try {
      await apiService.checkout();
      setCartItems([]);
    } catch(error) {
      setError(true);
      console.error(error);
    }
  };

  const addProduct = async (productInfo: NewProduct) => {
    try {
      const newProduct = await apiService.createProduct(productInfo);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch(error) {
      setError(true);
      if (error instanceof ZodError) {
        console.error(error.issues);
      } else {
        console.error(error);
      }
    }
  };

  const updateProduct = async (id: string, newInfoForProduct: NewProduct) => {
    try {
      const updatedProduct = await apiService.editProduct(id, newInfoForProduct);
      setProducts((prevProducts) => prevProducts.map((product) => {
        return product._id === id ? updatedProduct : product;
      }));
    } catch(error) {
      setError(true);
      if (error instanceof ZodError) {
        console.error(error.issues);
      } else {
        console.error(error);
      }
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch(error) {
      setError(true);
      console.error(error);
    }
  };

  const toggleAddVisibility = () => {
    setFormVisible(!formVisible);
  };

  if (error) {
    return (
      <>
        <h1>Uh oh, we've encountered an error!</h1>
        <p>Please check the console for error details.</p>
        <a href="http://localhost:5173">Or, you can return home by clicking this link.</a>
      </>
    )
  }

  return (
    <>
      <header>
        <Cart cartItems={cartItems} checkoutCart={checkoutCart} />
      </header>
      <ProductList products={products} removeProduct={removeProduct} updateProduct={updateProduct} addItemToCart={addItemToCart} />
      <p>
        {!formVisible &&
          <button className="add-product-button" onClick={toggleAddVisibility}>Add A Product</button>}
      </p>
      {formVisible && <AddProductForm addProduct={addProduct} setFormVisible={setFormVisible} />}
    </>
  );
}

export default App;
