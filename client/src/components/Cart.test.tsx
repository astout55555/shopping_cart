import Cart from "./Cart";
import { render, screen } from "@testing-library/react";

it("has heading h2", () => {
  render(<Cart checkoutCart={vi.fn()} cartItems={[]} />);
  const heading = screen.getByRole("heading", { level: 2, name: /your cart/i });
  expect(heading).toBeInTheDocument();
});
