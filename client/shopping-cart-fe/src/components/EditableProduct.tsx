import React from 'react';

import {
  EditableProductProps,
} from '../types';

import Product from './Product';
import EditForm from './EditForm';

const EditableProduct = ({product, removeProduct, updateProduct}: EditableProductProps) => {
  const [editFormVisible, setEditFormVisible] = React.useState(false);

  const handleEditVisibilityToggle = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setEditFormVisible(!editFormVisible);
  };

  return (
    <>
      <Product product={product} removeProduct={removeProduct} 
        editFormVisible={editFormVisible} handleEditVisibilityToggle={handleEditVisibilityToggle} />
      { editFormVisible && <EditForm product={product} updateProduct={updateProduct}
        handleEditVisibilityToggle={handleEditVisibilityToggle} /> }
    </>
  );
}
 
export default EditableProduct;