import React from "react";

import {
  AddProductFormProps,
} from '../types';
import { CurrencyContext, CurrencyContextType } from "../providers/CurrencyProvider";

const AddProductForm = ({ addProduct, setFormVisible }: AddProductFormProps) => {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('0');
  const [quantity, setQuantity] = React.useState('0');

  const { currency, rateUSDToEUR } = React.useContext<CurrencyContextType>(CurrencyContext);

  React.useEffect(() => {
    setPrice((prevPrice) => {
      if (currency === '$') {
        return (+prevPrice / rateUSDToEUR).toFixed(2);
      } else {
        return (+prevPrice * rateUSDToEUR).toFixed(2);
      }
    });
  }, [currency, rateUSDToEUR]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const priceInUSD = currency === '$' ? +price : (+price / rateUSDToEUR).toFixed(2);
      await addProduct({title, price: +priceInUSD, quantity: +quantity});
      setTitle('');
      setPrice('0');
      setQuantity('0');
      setFormVisible(false);
    } catch(error) {
      console.error(error);
    }
  }

  const handleCancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setFormVisible(false);
  }

  return ( 
    <div className="add-form">
      <form onSubmit={handleSubmit} role='form' >
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price (in {currency}):</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
            onChange={(event) => setQuantity(event.target.value)}
            value={quantity}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={handleCancel} >Cancel</button>
        </div>
      </form>
    </div>
   );
}
 
export default AddProductForm;