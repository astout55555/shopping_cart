export interface NewProduct {
  title: string,
  quantity: number,
  price: number
}

export interface ProductType extends NewProduct {
  _id: string,
}

export interface CartItemType extends ProductType {
  productId: string
}

type SetFormVisibleType = React.Dispatch<React.SetStateAction<boolean>>;
type AddProductType = (productInfo: NewProduct) => Promise<void>;
type RemoveProductType = (id: string) => Promise<void>;
type UpdateProductType = (id: string, newInfoForProduct: NewProduct) => Promise<void>;
type HandleEditVisibilityToggleType = (event: React.SyntheticEvent) => void;
type AddItemToCartType = (productId: string) => Promise<void>;

export interface CartProps {
  cartItems: CartItemType[],
  checkoutCart: () => Promise<void>
}

export interface ProductListProps {
  products: ProductType[],
  removeProduct: RemoveProductType,
  updateProduct: UpdateProductType,
  addItemToCart: AddItemToCartType
}

export interface AddProductFormProps {
  addProduct: AddProductType,
  setFormVisible: SetFormVisibleType
}

export interface ProductProps {
  product: ProductType,
  removeProduct: RemoveProductType,
  editFormVisible: boolean,
  handleEditVisibilityToggle: HandleEditVisibilityToggleType,
  addItemToCart: AddItemToCartType
}

export interface EditFormProps {
  product: ProductType,
  updateProduct: UpdateProductType,
  handleEditVisibilityToggle: HandleEditVisibilityToggleType
}

export interface EditableProductProps {
  product: ProductType,
  removeProduct: RemoveProductType,
  updateProduct: UpdateProductType,
  addItemToCart: AddItemToCartType
}

export interface AddToCartReturnData {
  product: ProductType,
  item: CartItemType
}
