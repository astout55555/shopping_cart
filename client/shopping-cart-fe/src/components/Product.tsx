import {
  ProductType,
} from '../types'

const Product = ({title, price, quantity}: ProductType) => {
  const addToCartButton = (quantity: number) => {
    if (quantity > 0) {
      return (<button className="add-to-cart">Add to Cart</button>);
    } else {
      return (<button className="add-to-cart" disabled>Add to Cart</button>);
    }
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          {addToCartButton(quantity)}
          <button className="edit">Edit</button>
        </div>
        <button className="delete-button"><span>X</span></button>
      </div>
    </li>
  )
}

export default Product;