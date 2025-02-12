import { z } from 'zod';

export const newProductSchema = z.object({
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const productSchema = newProductSchema.extend({
  _id: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

export const cartItemSchema = productSchema.extend({
  productId: z.string(),
});

export type NewProduct = z.infer<typeof newProductSchema>;
export type ProductType = z.infer<typeof productSchema>;
export type CartItemType = z.infer<typeof cartItemSchema>;

export const productArraySchema = z.array(productSchema);
export const cartItemArraySchema = z.array(cartItemSchema);

export const addToCartReturnDataSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
});

export type AddToCartReturnDataType = z.infer<typeof addToCartReturnDataSchema>;

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
  displayPrice: string,
  updateProduct: UpdateProductType,
  handleEditVisibilityToggle: HandleEditVisibilityToggleType
}

export interface EditableProductProps {
  product: ProductType,
  displayPrice: string,
  removeProduct: RemoveProductType,
  updateProduct: UpdateProductType,
  addItemToCart: AddItemToCartType
}
