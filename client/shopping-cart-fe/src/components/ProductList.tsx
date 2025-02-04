import Product from './Product';
 
const ProductList = () => {
  return (
    <main>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          <Product name="Amazon Kindle E-reader" price="$79.99" quantity={5} />
          <Product name="Apple 10.5-Inch iPad Pro" price="$649.99" quantity={2} />
          <Product name="Yamaha Portable Keyboard" price="$159.99" quantity={0} />
        </ul>
      </div>
    </main>
  );
}
 
export default ProductList;