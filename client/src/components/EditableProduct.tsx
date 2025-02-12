import React from 'react';
import {
  EditableProductProps,
} from '../types';
import Product from './Product';
import EditForm from './EditForm';
import { CurrencyContext, CurrencyContextType } from '../providers/CurrencyProvider';

const EditableProduct = ({product, removeProduct, updateProduct, addItemToCart}: EditableProductProps) => {
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [displayPrice, setDisplayPrice] = React.useState(product.price.toFixed(2));
  const { currency, rateUSDToEUR } = React.useContext<CurrencyContextType>(CurrencyContext);

  React.useEffect(() => {
    if (currency === '$') {
      setDisplayPrice(product.price.toFixed(2));
    } else {
      setDisplayPrice((product.price * rateUSDToEUR).toFixed(2));
    }
  }, [currency, product.price, rateUSDToEUR]);

  const handleEditVisibilityToggle = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setEditFormVisible(!editFormVisible);
  };

  return (
    <>
      <Product product={product} removeProduct={removeProduct} addItemToCart={addItemToCart}
        editFormVisible={editFormVisible} handleEditVisibilityToggle={handleEditVisibilityToggle} />
      {editFormVisible && <EditForm product={product} displayPrice={displayPrice}
        updateProduct={updateProduct} handleEditVisibilityToggle={handleEditVisibilityToggle} /> }
    </>
  );
}
 
export default EditableProduct;