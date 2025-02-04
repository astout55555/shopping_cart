import { useState } from 'react';

import {
  ProductType,
} from '../types'
import EditForm from './EditForm';

const Product = ({id, title, price, quantity}: ProductType) => {
  const [editFormVisible, setEditFormVisible] = useState(false);

  const toggleEditVisibility = () => {
    setEditFormVisible(!editFormVisible);
  };

  const addToCartButton = (quantity: number) => {
    if (quantity > 0) {
      return (<button className="add-to-cart">Add to Cart</button>);
    } else {
      return (<button className="add-to-cart" disabled>Add to Cart</button>);
    }
  }

  return (
    <li key={id} className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          {addToCartButton(quantity)}
          <button onClick={toggleEditVisibility} className="edit">
            {editFormVisible ? "Cancel" : "Edit"}
          </button>
        </div>
        <button className="delete-button"><span>X</span></button>
      </div>
      <EditForm id={id} title={title} price={price} quantity={quantity} />
    </li>
  );
}

export default Product;