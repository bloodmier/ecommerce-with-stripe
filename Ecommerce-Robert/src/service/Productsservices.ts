
import { IProduct } from "../models/Iproduct";
import { deletedata, getdata, patchdata, postdata } from "./basicservice";

const API_URL = "http://localhost:3000/products";
 
const Handleproductrequest = async <T> (request: Promise<T>) => {  
  try {
    return await request;
  } catch (error) {
    console.error("Något gick fel med api anropet", error);
    throw new Error
  }
};
 
export const getProducts = async <T>(): Promise<T> => {
  return Handleproductrequest<T>(getdata<T>(API_URL));
};
 
export const getProductById = async <T>(id: number): Promise<T> => {
  return Handleproductrequest(getdata<T>(`${API_URL}/${id}`));
};
 
export const postProduct = async <T>(payload: IProduct): Promise<T> => {
  return Handleproductrequest(postdata<T>(`${API_URL}`, payload));
};
 
export const deleteProductapi = async <T>(id: number): Promise<T> => {
  return Handleproductrequest(deletedata<T>(`${API_URL}/${id}`));
};
 
export const updateProductapi = async <T>(id: number, payload: IProduct): Promise<T> => {
  return Handleproductrequest(patchdata<T>(`${API_URL}/${id}`, payload));
};