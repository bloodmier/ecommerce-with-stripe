
import { Icustomer } from "../models/Icustomer";
import { deletedata, getdata, patchdata, postdata } from "./basicservice";

 
const API_URL = "http://localhost:3000/customers";
 
const Handlecustomerrequest = async <T>(request: Promise<T>) => {
  try {
    return await request;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Något gick fel med API-anropet:", error.message);
    } else {
      console.error("Ett okänt fel inträffade:", error);
    }
    throw error;
  }
};

 
export const getallCustomers = async <T>(): Promise<T> => {
  return Handlecustomerrequest<T>(getdata<T>(API_URL));
};

export const getCustomerById = async <T>(id: number): Promise<T> => {
  return Handlecustomerrequest(getdata<T>(`${API_URL}/${id}`));
};

export const checkCustomerEmail = async <T>(email: string): Promise<T> => {
  return Handlecustomerrequest(getdata<T>(`${API_URL}/email/${email}`));
};
 
export const postCustomer = async <T>(payload: Icustomer): Promise<T> => {
  return Handlecustomerrequest(postdata<T>(`${API_URL}`, payload));
};
 
export const deleteCustomerapi = async <T>(id: number): Promise<T> => {
  return Handlecustomerrequest(deletedata<T>(`${API_URL}/${id}`));
};
 
export const updateCustomerapi = async <T>(id: number, payload: Icustomer): Promise<T> => {
  return Handlecustomerrequest(patchdata<T>(`${API_URL}/${id}`, payload));
};