import {
  ProductType,
} from '../types';
 
const CartItem = ({ id, title, quantity, price }: ProductType) => {
  return ( 
    <tr key={id}>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  );
}
 
export default CartItem;