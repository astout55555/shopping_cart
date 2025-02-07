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

const mockCart = [
  {
    _id: "a",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
    productId: '1'
  },
  {
    _id: "b",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
    productId: '2'
  },
];

const App = () => {
  const [formVisible, setFormVisible] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItemType[]>(mockCart);
  const [products, setProducts] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    fetchProducts();
    // fetchCartItems();
  }, []);

  const fetchProducts = async () => {
    try {
      const allProducts = await apiService.getProducts();
      setProducts(allProducts);
    } catch(error) {
      console.error(error);
    }
  }

  // define fetchCartItems func

  const addProduct = async (productInfo: NewProduct) => {
    try {
      const newProduct = await apiService.createProduct(productInfo);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch(error) {
      console.error(error);
    }
  }

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
  }

  const toggleAddVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <>
      <header>
        <Cart cartItems={cartItems} />
      </header>
      <ProductList products={products} removeProduct={removeProduct} updateProduct={updateProduct} />
      <p>
        {!formVisible &&
          <button className="add-product-button" onClick={toggleAddVisibility}>Add A Product</button>}
      </p>
      {formVisible && <AddProductForm addProduct={addProduct} setFormVisible={setFormVisible} />}
    </>
  )
}

export default App;
