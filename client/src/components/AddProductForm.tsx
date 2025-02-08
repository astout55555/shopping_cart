import React from "react";

import {
  AddProductFormProps,
  NewProduct
} from '../types';

const AddProductForm = ({ addProduct, setFormVisible }: AddProductFormProps) => {
  const [formValues, setFormValues] = React.useState<NewProduct>({
    title: '', price: 0, quantity: 0
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await addProduct(formValues);
      setFormValues({title: '', price: 0, quantity: 0});
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
            onChange={(event) => setFormValues({...formValues, title: event.target.value})}
            value={formValues.title}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            onChange={(event) => setFormValues({...formValues, price: Number(event.target.value)})}
            value={formValues.price}
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
            onChange={(event) => setFormValues({...formValues, quantity: Number(event.target.value)})}
            value={formValues.quantity}
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