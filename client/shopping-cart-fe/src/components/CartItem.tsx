import {
  ProductType,
} from '../types';
 
const CartItem = ({ title, quantity, price }: ProductType) => {
  return ( 
    <>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </>
  );
}
 
export default CartItem;