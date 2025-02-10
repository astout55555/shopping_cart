import {
  ProductProps,
} from '../types';

const Product = ({product, removeProduct, editFormVisible, handleEditVisibilityToggle, addItemToCart }: ProductProps) => {
  const handleDelete = (event: React.SyntheticEvent) => {
    event.preventDefault();
    removeProduct(product._id);
  };

  const handleAddToCart = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addItemToCart(product._id);
  };

  const addToCartButton = (quantity: number) => {
    if (quantity > 0) {
      return (
        <button className="add-to-cart" onClick={handleAddToCart} >Add to Cart</button>
      );
    } else {
      return (<button className="add-to-cart" disabled>Add to Cart</button>);
    }
  };

  return (
    <>
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">{product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          {addToCartButton(product.quantity)}
          {!editFormVisible && <button onClick={handleEditVisibilityToggle} className="edit">Edit</button>}
        </div>
        <button className="delete-button" onClick={handleDelete} ><span>X</span></button>
      </div>
    </>
  );
};

export default Product;