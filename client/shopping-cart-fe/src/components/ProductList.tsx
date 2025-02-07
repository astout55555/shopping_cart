import {
  ProductListProps,
} from '../types';

import EditableProduct from './EditableProduct';
 
const ProductList = ({ products, removeProduct, updateProduct }: ProductListProps) => {
  const allProducts = () => {
    return products.map(
      (product) => (
        <li key={ product._id } className="product">
          <EditableProduct product={product} removeProduct={removeProduct} updateProduct={updateProduct} />
        </li>
      )
    );
  }

  return (
    <main>
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