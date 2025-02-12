import React from 'react';

import {
  CartItemType,
} from '../types';
import { CurrencyContext, CurrencyContextType } from '../providers/CurrencyProvider';
 
const CartItem = ({ title, quantity, price }: CartItemType) => {
  const { currency, rateUSDToEUR } = React.useContext<CurrencyContextType>(CurrencyContext);

  const convertPrice = (price: number) => {
    return (price * rateUSDToEUR).toFixed(2);
  }

  return ( 
    <>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{currency}{currency === '$' ? price : convertPrice(price)}</td>
    </>
  );
}
 
export default CartItem;
