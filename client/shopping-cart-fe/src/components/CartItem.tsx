import {
  CartItemType,
} from '../types';
 
const CartItem = ({ title, quantity, price }: CartItemType) => {
  return ( 
    <>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </>
  );
}
 
export default CartItem;