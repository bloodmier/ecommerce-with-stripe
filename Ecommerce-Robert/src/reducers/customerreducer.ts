import { Icustomer } from "../models/Icustomer";

export interface IAction {
    type: IActiontype;
    payload: string;
}

export enum IActiontype {
  GET_CUSTOMERS,
  ADD_CUSTOMER,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER
}

export const customerReducer = (customer: Icustomer[],action: IAction): Icustomer[] => {
  switch (action.type) {
    case IActiontype.GET_CUSTOMERS:
      const allcustomers = action.payload
      return JSON.parse(allcustomers);
    case IActiontype.UPDATE_CUSTOMER:
      const updatedcustomer = JSON.parse(action.payload)
      return customer.map((p)=> p.id === updatedcustomer.id ? updatedcustomer : p)
    case IActiontype.ADD_CUSTOMER:
      const newcustomer = JSON.parse(action.payload)
      return [...customer, newcustomer]
    case IActiontype.REMOVE_CUSTOMER:
      const id = JSON.parse(action.payload)
      return customer.filter((p)=> p.id !== id)
    default:
      return customer;
  }
};
