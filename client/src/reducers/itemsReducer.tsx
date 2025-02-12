import {
  ProductType,
  CartItemType,
  AddToCartReturnDataType,
} from '../types';

export interface ItemsState {
  products: ProductType[],
  cartItems: CartItemType[]
}

export interface ItemsAction {
  type: string,
  payload?: any // turn off "no explicit any" rule?
}

const itemsReducer = (
  currentState: ItemsState, action: ItemsAction
) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS': {
      const newState: ItemsState = {
        products: [...action.payload.allProducts],
        cartItems: [...currentState.cartItems]
      };
      return newState;
    }
    case 'FETCH_CART_ITEMS': {
      const newState: ItemsState = {
        products: [...currentState.products],
        cartItems: [...action.payload.cartItems],
      };
      return newState;
    }
    case 'ADD_PRODUCT': {
      const newProduct: ProductType = action.payload.newProduct;
      const newState: ItemsState = {
        products: [...currentState.products, newProduct],
        cartItems: [...currentState.cartItems]
      };
      return newState;
    }
    case 'UPDATE_PRODUCT': {
      const updatedProduct: ProductType = action.payload.updatedProduct;
      const updatedProducts = currentState.products.map((product) => {
        return product._id === updatedProduct._id ? updatedProduct : product;
      });
      const newState: ItemsState = {
        products: [...updatedProducts],
        cartItems: [...currentState.cartItems],
      };
      return newState;
    }
    case 'REMOVE_PRODUCT': {
      const id: string = action.payload.id;
      const newState: ItemsState = {
        products: [...currentState.products.filter((product) => product._id !== id)],
        cartItems: [...currentState.cartItems],
      };
      return newState;
    }
    case 'ADD_ITEM_TO_CART': {
      const {product, item}: AddToCartReturnDataType = action.payload.responseData;
      const newState: ItemsState = {
        products: [...currentState.products],
        cartItems: [...currentState.cartItems],
      };

      newState.products = (currentState.products.map((prevProduct) => {
        return prevProduct._id === product._id ? product : prevProduct;
      }));

      if (currentState.cartItems.findIndex((cartItem) => cartItem._id === item._id) !== -1) {
        newState.cartItems = currentState.cartItems.map((prevCartItem) => {
          return prevCartItem._id === item._id ? item : prevCartItem;
        });
      } else {
        newState.cartItems = [...currentState.cartItems, item];
      }
      return newState;
    }
    case 'CHECKOUT_CART': {
      const newState: ItemsState = {
        products: [...currentState.products],
        cartItems: [],
      };
      return newState;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export default itemsReducer;
