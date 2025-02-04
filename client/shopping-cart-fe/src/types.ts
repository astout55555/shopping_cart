export interface CartItemProps {
  title: string,
  quantity: number,
  price: string
}

export interface ProductType {
  title: string,
  quantity: number,
  price: string
}

export interface CartProps {
  cartItems: ProductType[],
}

export interface ProductListProps {
  products: ProductType[]
}
