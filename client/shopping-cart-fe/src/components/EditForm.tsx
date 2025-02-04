import {
  ProductType,
} from '../types';

const EditForm = ({title, quantity, price}: ProductType) => {
  return ( 
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">{title}</label>
          <input
            type="text"
            id="product-name"
            value="Apple 10.5-Inch iPad Pro"
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">{price}</label>
          <input
            type="number"
            id="product-price"
            value="649.99"
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">{quantity}</label>
          <input
            type="number"
            id="product-quantity"
            value="2"
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
}
 
export default EditForm;