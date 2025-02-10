import EditForm from './EditForm';
// import { handleEditVisibilityToggle } from './Product';
import apiServices from '../services';
import { mockProducts } from '../mockData/data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../services.ts');
const mockedGetProducts = vi.mocked(apiServices.getProducts);
mockedGetProducts.mockResolvedValue(mockProducts);

vi.mock('./Product.ts');
// const mockedHandleEditVisibilityToggle = vi.mocked(handleEditVisibilityToggle);

beforeEach(() => {
  render(<EditForm product={mockProducts[1]} updateProduct={vi.fn()} handleEditVisibilityToggle={vi.fn()} />);
});

it('updates field when user types', async () => {
  render(<EditForm product={mockProducts[1]} updateProduct={vi.fn()} handleEditVisibilityToggle={vi.fn()} />);
  const user = userEvent.setup();
  const titleField = screen.getByRole('textbox', { name: 'Product Name' });
  await user.clear(titleField);
  await user.type(titleField, 'Hello Product');
  expect(titleField).toHaveValue('Hello Product');
});

// it('edit form disappears when user submits', async () => {
//   const user = userEvent.setup();
//   const updateButton = screen.getByRole('button', { name: 'Update' });
//   await user.click(updateButton);

//   const editForm = screen.queryByRole('form');
//   expect(editForm).not.toBeInTheDocument();
// });
