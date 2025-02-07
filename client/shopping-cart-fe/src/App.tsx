import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductForm from './components/AddProductForm';

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
      console.error(error);
    }
  };

  const fetchCartItems = async (abortController: AbortController) => {
    try {
      const cartItems = await apiService.getCartItems(abortController);
      setCartItems(cartItems);
    } catch(error) {
      console.error(error);
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
      console.error(error);
    }
  };

  const checkoutCart = async () => {
    try {
      await apiService.checkout();
      setCartItems([]);
    } catch(error) {
      console.error(error);
    }
  };

  const addProduct = async (productInfo: NewProduct) => {
    try {
      const newProduct = await apiService.createProduct(productInfo);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch(error) {
      console.error(error);
    }
  };

  const updateProduct = async (id: string, newInfoForProduct: NewProduct) => {
    try {
      const updatedProduct = await apiService.editProduct(id, newInfoForProduct);
      setProducts((prevProducts) => prevProducts.map((product) => {
        return product._id === id ? updatedProduct : product;
      }));
    } catch(error) {
      console.error(error);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await apiService.deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch(error) {
      console.error(error);
    }
  };

  const toggleAddVisibility = () => {
    setFormVisible(!formVisible);
  };

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
