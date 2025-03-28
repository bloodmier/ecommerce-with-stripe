import { Icustomer } from "./Icustomer";

export type ICustomerCheck = ICustomerNotFound | ICustomerFound;


export interface ICustomerNotFound {
    exists: false; 
    message: string;
}
export interface ICustomerFound {
    exists: true; 
    customer: Icustomer;
}

