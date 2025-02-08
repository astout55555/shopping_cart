import React from 'react';

import {
  EditFormProps,
  NewProduct,
} from '../types';

const EditForm = ({product, updateProduct, handleEditVisibilityToggle}: EditFormProps) => {
  const [formValues, setFormValues] = React.useState<NewProduct>({
    title: product.title, price: product.price, quantity: product.quantity
  });

  const handleUpdate = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      updateProduct(product._id, formValues);
      handleEditVisibilityToggle(event);
    } catch(error) {
      console.error(error);
    }
  }

  return ( 
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleUpdate} >
        <div className="input-group">
          <label htmlFor="product-name">Title</label>
          <input
            type="text"
            id="product-name"
            value={formValues.title}
            aria-label="Product Name"
            onChange={(event) => setFormValues({...formValues, title: event.target.value})}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={formValues.price}
            aria-label="Product Price"
            onChange={(event) => setFormValues({...formValues, price: Number(event.target.value)})}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={formValues.quantity}
            aria-label="Product Quantity"
            onChange={(event) => setFormValues({...formValues, quantity: Number(event.target.value)})}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={handleEditVisibilityToggle} >Cancel</button>
        </div>
      </form>
    </div>
  );
}
 
export default EditForm;