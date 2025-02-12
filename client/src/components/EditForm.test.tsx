import EditForm from './EditForm';
import apiServices from '../services/productService';
import { mockProducts } from '../mockData/data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../services/productService.ts');
const mockedGetProducts = vi.mocked(apiServices.getProducts);
mockedGetProducts.mockResolvedValue(mockProducts);

it('updates field when user types', async () => {
  render(<EditForm product={mockProducts[0]} updateProduct={vi.fn()}
    handleEditVisibilityToggle={vi.fn()} displayPrice='79.99' />);
  const user = userEvent.setup();
  const titleField = screen.getByRole('textbox', { name: 'Product Name' });
  await user.clear(titleField);
  await user.type(titleField, 'Hello Product!');
  expect(titleField).toHaveValue('Hello Product!');
});

it('sends the new form data when user submits edit form', async () => {
  const mockUpdateProduct = vi.fn();
  render(<EditForm product={mockProducts[0]} updateProduct={mockUpdateProduct}
    handleEditVisibilityToggle={vi.fn()} displayPrice='79.99' />);

  const user = userEvent.setup();
  const titleField = screen.getByRole('textbox', { name: 'Product Name' });
  await user.clear(titleField);
  await user.type(titleField, 'Testing, testing, 1, 2, 3...');

  const updateButton = screen.getByRole('button', { name: 'Update' });
  await user.click(updateButton);

  expect(mockUpdateProduct).toHaveBeenCalledWith('1', {price: mockProducts[0].price, quantity: mockProducts[0].quantity, title: 'Testing, testing, 1, 2, 3...'});
});
