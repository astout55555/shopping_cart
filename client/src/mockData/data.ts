import { CartItemType, ProductType } from "../types";

export const mockProducts: ProductType[] = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99,
  },
  {
    _id: "3",
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
  {
    _id: "4",
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  },
];

export const mockCart: CartItemType[] = [
  {
    _id: "a",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
    productId: '1'
  },
  {
    _id: "b",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
    productId: '2'
  },
];
