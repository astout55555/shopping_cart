import Cart from "./Cart";
import { render, screen } from "@testing-library/react";

it("has heading h1", () => {
  render(<Cart checkoutCart={vi.fn()} cartItems={[]} />);
  const heading = screen.getByRole("heading", { level: 1, name: /the shop/i });
  expect(heading).toBeInTheDocument();
});
