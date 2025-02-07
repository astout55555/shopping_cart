import CartItem from "./CartItem";

import {
  CartProps,
  CartItemType,
} from '../types';

const Cart = ({ cartItems, checkoutCart }: CartProps) => {
  const handleCheckout = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    checkoutCart();
  }

  const allCartItems = () => {
    return cartItems.map(
      (cartItem: CartItemType) => (
        <tr key={ cartItem._id }>
          <CartItem {...cartItem} />
        </tr>
      )
    );
  }

  const totalPrice = () => {
    return cartItems.map((item) => item.price).reduce((accum, price) => accum + price);
  }

  if (cartItems.length === 0) {
    return (
      <>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          <button className="checkout" disabled>Checkout</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <table className="cart-items">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {allCartItems()}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="total">
                  {totalPrice()}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="checkout-button">
            <button className="checkout" onClick={handleCheckout} >Checkout</button>
          </div>
        </div>
      </>
    )
  }
}
 
export default Cart;