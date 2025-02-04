import Product from './Product';

import {
  ProductListProps,
} from '../types';
 
const ProductList = ({ products }: ProductListProps) => {
  const allProducts = () => {
    return products.map(
      (product) => <Product {...product} />
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