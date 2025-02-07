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

export interface CartProps {
  cartItems: CartItemType[]
}

export interface ProductListProps {
  products: ProductType[],
  removeProduct: RemoveProductType,
  updateProduct: UpdateProductType
}

export interface AddProductFormProps {
  addProduct: AddProductType,
  setFormVisible: SetFormVisibleType
}

export interface ProductProps {
  product: ProductType,
  removeProduct: RemoveProductType,
  editFormVisible: boolean,
  handleEditVisibilityToggle: HandleEditVisibilityToggleType
}

export interface EditFormProps {
  product: ProductType,
  updateProduct: UpdateProductType,
  handleEditVisibilityToggle: HandleEditVisibilityToggleType
}

export interface EditableProductProps {
  product: ProductType,
  removeProduct: RemoveProductType,
  updateProduct: UpdateProductType
}