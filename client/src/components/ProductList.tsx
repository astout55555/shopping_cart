import React from 'react';
import { ThemeContext, themeStyles } from '../providers/ThemeProvider';
import {
  ProductListProps,
} from '../types';
import EditableProduct from './EditableProduct';
 
const ProductList = ({ products, removeProduct, updateProduct, addItemToCart }: ProductListProps) => {
  const { theme } = React.useContext(ThemeContext);

  const allProducts = () => {
    return products.map(
      (product) => (
        <li key={ product._id } className="product" style={themeStyles[theme]}>
          <EditableProduct product={product} removeProduct={removeProduct} updateProduct={updateProduct} addItemToCart={addItemToCart} />
        </li>
      )
    );
  }

  return (
    <main style={themeStyles[theme]}>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {allProducts()}
        </ul>
      </div>
    </main>
  );
}
 
export default ProductList;