import React from 'react';
import {
  EditFormProps,
} from '../types';
import { CurrencyContext, CurrencyContextType } from '../providers/CurrencyProvider';

const EditForm = ({product, displayPrice, updateProduct, handleEditVisibilityToggle}: EditFormProps) => {
  const [title, setTitle] = React.useState(product.title);
  const [price, setPrice] = React.useState(displayPrice);
  const [quantity, setQuantity] = React.useState(product.quantity.toString());
  const { currency, rateUSDToEUR } = React.useContext<CurrencyContextType>(CurrencyContext);

  React.useEffect(() => {
    setPrice(displayPrice);
  }, [currency, displayPrice]);

  const handleUpdate = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const priceInUSD = currency === '$' ? +price : (+price / rateUSDToEUR).toFixed(2);
      await updateProduct(
        product._id,
        {title, price: +priceInUSD, quantity: +quantity}
      );
      handleEditVisibilityToggle(event);
    } catch(error) {
      console.error(error);
    }
  }

  return ( 
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleUpdate} role='form'>
        <div className="input-group">
          <label htmlFor="product-name">Title:</label>
          <input
            type="text"
            id="product-name"
            value={title}
            aria-label="Product Name"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price (in {currency}):</label>
          <input
            type="number"
            id="product-price"
            value={price}
            aria-label="Product Price"
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            value={quantity}
            aria-label="Product Quantity"
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={handleEditVisibilityToggle}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
 
export default EditForm;