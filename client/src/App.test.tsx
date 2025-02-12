import App from './App';
import apiServices from './services/productService';
import { mockProducts, mockCart } from './mockData/data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('./services/productService.ts');

// import axios from 'axios';
// vi.mock('axios');
// const mockedAxiosGet = vi.mocked(axios.get);
// ...do I need to do something re: axios & deep mocking to avoid the error?
// ...does this have anything to do with the act warning?
const mockedGetProducts = vi.mocked(apiServices.getProducts);
const mockedGetCartItems = vi.mocked(apiServices.getCartItems);

mockedGetProducts.mockResolvedValue(mockProducts);
mockedGetCartItems.mockResolvedValue(mockCart);

beforeEach(() => {
  render(<App/>);
})

it('does not show the AddProductForm at first', () => {
  const form = screen.queryByRole('form');
  expect(form).not.toBeInTheDocument();
});

it('does show the Cart on app render', () => {
  const cartHeader = screen.getByRole('heading', {level: 2, name: /Your Cart/i});
  expect(cartHeader).toBeInTheDocument();
});

it('does show the ProductList on app render', () => {
  const productsHeader = screen.getByRole('heading', {level: 2, name: /Products/i});
  expect(productsHeader).toBeInTheDocument();
});

it("does show an enabled 'Add A Product' button", () => {
  const addProductButton = screen.getByRole('button', {name: /Add A Product/i});
  expect(addProductButton).toBeInTheDocument();
  expect(addProductButton).toBeEnabled();
})

// noticing a `stderr` in the logs for this test...
it("displays the AddProductForm component when user clicks 'Add A Product' button, then removes button", async () => {
  const addProductButton = screen.getByRole('button', {name: /Add A Product/i});
  const user = userEvent.setup();
  await user.click(addProductButton);
  const form = screen.queryByRole('form');
  expect(form).toBeInTheDocument();

  const removedButton = screen.queryByRole('button', {name: /Add A Product/i});
  expect(removedButton).not.toBeInTheDocument();
});
