
import { IOrder, IupdateOrderQuantity } from "../models/Iorder";
import { deletedata, getdata, patchdata, postdata } from "./basicservice";
 
const API_URL = "http://localhost:3000/orders";
const API_ITEM_URL = "http://localhost:3000/order-items"
 
const Handleorderrequest = async <T> (request: Promise<T>) => {
  try {
    return await request;
  } catch (error) {
    console.error("Något gick fel med api anropet", error);
    throw new Error
  }
};
 
export const getallOrders = async <T>(): Promise<T> => {
  
  return Handleorderrequest<T>(getdata<T>(API_URL));
};
 
export const getOrderById = async <T>(id: number): Promise<T> => {
  return Handleorderrequest(getdata<T>(`${API_URL}/${id}`));
};
export const getOrderByPaymentId = async <T>(id: string): Promise<T> => {
  return Handleorderrequest(getdata<T>(`${API_URL}/payment/${id}`));
};
 
export const postOrder = async <T>(payload: IOrder): Promise<T> => {
  return Handleorderrequest(postdata<T>(`${API_URL}`, payload));
};
 
export const deleteOrderapi = async <T>(id: number): Promise<T> => {
  return Handleorderrequest(deletedata<T>(`${API_URL}/${id}`));
};
 
export const updateOrderapi = async <T>(id: number, payload: IOrder): Promise<T> => {
  return Handleorderrequest(patchdata<T>(`${API_URL}/${id}`, payload));
};

export const updateOrderItemQuantity = async <T>(id: number, payload: IupdateOrderQuantity): Promise<T> => {
  return Handleorderrequest(patchdata<T>(`${API_ITEM_URL}/${id}`, payload));
};

export const deleteOrderItemapi = async <T>(id: number): Promise<T> => {
  return Handleorderrequest(deletedata<T>(`${API_ITEM_URL}/${id}`));
};
