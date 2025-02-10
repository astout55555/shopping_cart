import EditableProduct from './EditableProduct';
import apiServices from '../services';
import { mockProducts } from '../mockData/data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../services.ts');
const mockedGetProducts = vi.mocked(apiServices.getProducts);
mockedGetProducts.mockResolvedValue(mockProducts);

it('renders its child Product component', () => {
  render(<EditableProduct product={mockProducts[0]} removeProduct={vi.fn()} updateProduct={vi.fn()} addItemToCart={vi.fn()} />);
  const productHeader = screen.getByRole('heading', {level: 3, name: mockProducts[0].title});
  expect(productHeader).toBeInTheDocument();
});

it('does not show the EditForm initially', () => {
  render(<EditableProduct product={mockProducts[0]} removeProduct={vi.fn()} updateProduct={vi.fn()} addItemToCart={vi.fn()} />);
  const form = screen.queryByRole('form');
  expect(form).not.toBeInTheDocument();
});

it('reveals the EditForm when user clicks "Edit" button', async () => {
  render(<EditableProduct product={mockProducts[0]} removeProduct={vi.fn()} updateProduct={vi.fn()} addItemToCart={vi.fn()} />);
  const user = userEvent.setup();
  const editButton = screen.getByRole('button', {name: 'Edit'});
  await user.click(editButton);

  const editForm = screen.getByRole('form');
  expect(editForm).toBeInTheDocument();
});

it('hides the edit form when user submits', async () => {
  const mockUpdateProduct = vi.fn();
  render(<EditableProduct product={mockProducts[0]} removeProduct={vi.fn()} updateProduct={mockUpdateProduct} addItemToCart={vi.fn()} />);

  const user = userEvent.setup();
  const editButton = screen.getByRole('button', { name: 'Edit' });
  await user.click(editButton);

  const editForm = screen.getByRole('form');
  expect(editForm).toBeInTheDocument();

  const updateButton = screen.getByRole('button', { name: 'Update' });
  await user.click(updateButton);

  const removedEditForm = screen.queryByRole('form');
  expect(removedEditForm).not.toBeInTheDocument();
});
