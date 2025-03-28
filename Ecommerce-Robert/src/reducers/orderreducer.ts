
import { IOrder, IOrderWithCustomer } from "../models/Iorder";

export interface IAction {
    type: IActiontype;
    payload: string;
}

export enum IActiontype {
  GET_ORDERS,
  ADD_ORDER,
  REMOVE_ORDER,
  UPDATE_ORDER
}

export const orderReducer = (order: IOrder[],action: IAction): IOrder[] => {
  switch (action.type) {
    case IActiontype.GET_ORDERS:
      const allorders = action.payload
      return JSON.parse(allorders);
    case IActiontype.UPDATE_ORDER:
      const updatedorder: IOrder = {
        ...JSON.parse(action.payload),
        id: Number(JSON.parse(action.payload).id),
      };  
      return order.map((p)=> p.id === updatedorder.id ? updatedorder : p)
    case IActiontype.ADD_ORDER:
      const neworder = JSON.parse(action.payload)
      return [...order, neworder]
    case IActiontype.REMOVE_ORDER:
      const id = JSON.parse(action.payload)
      return order.filter((p)=> p.id !== id)
    default:
      return order;
  }
};
