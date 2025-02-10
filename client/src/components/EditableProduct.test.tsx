import EditableProduct from './EditableProduct';
import apiServices from '../services';
import { mockProducts } from '../mockData/data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../services.ts');
const mockedGetProducts = vi.mocked(apiServices.getProducts);
mockedGetProducts.mockResolvedValue(mockProducts);

beforeEach(() => {
  render(<EditableProduct product={mockProducts[0]} removeProduct={vi.fn()} updateProduct={vi.fn()} addItemToCart={vi.fn()} />);
});

it('renders its child Product component', () => {
  const productHeader = screen.getByRole('heading', {level: 3, name: mockProducts[0].title});
  expect(productHeader).toBeInTheDocument();
});

it('does not show the EditForm initially', () => {
  const form = screen.queryByRole('form');
  expect(form).not.toBeInTheDocument();
});

it('reveals the EditForm when user clicks "Edit" button', async () => {
  const user = userEvent.setup();
  const editButton = screen.getByRole('button', {name: 'Edit'});
  await user.click(editButton);

  const editForm = screen.getByRole('form');
  expect(editForm).toBeInTheDocument();
});
