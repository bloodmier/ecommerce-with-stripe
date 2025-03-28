import { IProduct } from "../models/Iproduct";

export interface IAction {
    type: IActiontype;
    payload: string;
}

export enum IActiontype {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT
}

export const productReducer = (product: IProduct[],action: IAction): IProduct[] => {
  switch (action.type) {
    case IActiontype.GET_PRODUCTS:
      const allProducts = action.payload
      return JSON.parse(allProducts);
    case IActiontype.UPDATE_PRODUCT:
      const updatedproduct = JSON.parse(action.payload)
      return product.map((p)=> p.id === updatedproduct.id ? updatedproduct : p)
    case IActiontype.ADD_PRODUCT:
      const newproduct = JSON.parse(action.payload)
      return [...product, newproduct]
    case IActiontype.REMOVE_PRODUCT:
      const id = JSON.parse(action.payload)
      return product.filter((p)=> p.id !== id)
    default:
      return product;
  }
};
