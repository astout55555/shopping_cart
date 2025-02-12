import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProductForm from './components/AddProductForm';
import { ZodError } from 'zod';
import productService from './services/productService';
import {
  NewProduct,
  AddToCartReturnDataType,
} from './types';
import itemsReducer from './reducers/itemsReducer';
import {
  ItemsState,
} from './reducers/itemsReducer';
import { ThemeContext, ThemeContextType, themeStyles } from './providers/ThemeProvider';
import { CurrencyContext, CurrencyContextType } from './providers/CurrencyProvider';

const initialItemsState: ItemsState = {products: [], cartItems: []};

const App = () => {
  const [itemsState, dispatch] = React.useReducer(itemsReducer, initialItemsState);
  const [formVisible, setFormVisible] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { theme, handleThemeChange } = React.useContext<ThemeContextType>(ThemeContext);
  const { handleCurrencyChange } = React.useContext<CurrencyContextType>(CurrencyContext);

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
      const allProducts = await productService.getProducts(abortController);
      dispatch({
        type: 'FETCH_PRODUCTS',
        payload: {
          allProducts,
        }
      });
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
      const cartItems = await productService.getCartItems(abortController);
      dispatch({
        type: 'FETCH_CART_ITEMS',
        payload: {
          cartItems,
        }
      })
    } catch(error) {
      setError(true);
      if (error instanceof ZodError) {
        console.error(error.issues);
      } else {
        console.error(error);
      }
    }
  };

  const addProduct = async (productInfo: NewProduct) => {
    try {
      const newProduct = await productService.createProduct(productInfo);
      dispatch({
        type: 'ADD_PRODUCT',
        payload: {
          newProduct,
        },
      });
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
      const updatedProduct = await productService.editProduct(id, newInfoForProduct);
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
          updatedProduct,
        },
      });
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
      await productService.deleteProduct(id);
      dispatch({
        type: 'REMOVE_PRODUCT',
        payload: {
          id,
        },
      });
    } catch(error) {
      setError(true);
      console.error(error);
    }
  };

  const addItemToCart = async (productId: string) => {
    try {
      const responseData: AddToCartReturnDataType = await productService.addToCart(productId);
      dispatch({
        type: 'ADD_ITEM_TO_CART',
        payload: {
          responseData,
        },
      });
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
      await productService.checkout();
      dispatch({
        type: 'CHECKOUT_CART',
      });
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
    <div style={themeStyles[theme]} >
      <header style={themeStyles[theme]}>
        <h1>The Shop!</h1>
        <Cart cartItems={itemsState.cartItems} checkoutCart={checkoutCart} />
      </header>
      <ProductList products={itemsState.products} removeProduct={removeProduct} updateProduct={updateProduct} addItemToCart={addItemToCart} />
      <p style={themeStyles[theme]}>
        {!formVisible &&
          <button className="add-product-button" onClick={toggleAddVisibility}>
            Add A Product
          </button>
        }
      </p>
      {formVisible &&
        <AddProductForm addProduct={addProduct} setFormVisible={setFormVisible} />
      }
      <button onClick={handleThemeChange} style={{...themeStyles[theme], 'backgroundColor': 'blue'}}>
        Change Theme
      </button>
      <button onClick={handleCurrencyChange} style={{...themeStyles[theme], 'backgroundColor': 'red'}}>
        Change Currency
      </button>
    </div>
  );
}

export default App;
