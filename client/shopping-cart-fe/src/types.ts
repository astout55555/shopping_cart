export interface ProductType {
  id: string,
  title: string,
  quantity: number,
  price: string
}

export interface CartProps {
  cartItems: ProductType[]
}

export interface ProductListProps {
  products: ProductType[]
}
