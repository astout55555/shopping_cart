import './App.css';
import { useState } from 'react';
import ProductList from './components/ProductList';
import Header from './components/Header';
import AddProductForm from './components/AddProductForm';

const App = () => {
  const [displayAddForm, setDisplayAddForm] = useState(false);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setDisplayAddForm(!displayAddForm);
  }

  const addForm = () => {
    if (displayAddForm) {
      return (<AddProductForm />)
    } else {
      return null;
    }
  }

  return (
    <>
      <Header />
      <ProductList />
      <p>
        <button className="add-product-button" onClick={handleAddClick}>Add A Product</button>
      </p>
      {addForm()}
    </>
  )
}

export default App
