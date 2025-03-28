import { useEffect, useReducer } from "react";
import { customerReducer, IActiontype } from "../reducers/customerreducer";
import { checkCustomerEmail, getallCustomers, postCustomer } from "../service/Customerservices";
import { Icustomer } from "../models/Icustomer";
import { ICustomerCheck } from "../models/Icustomercheck";

export const useCustomer = () => {
const [customers, Dispatch] = useReducer(
    customerReducer,
    JSON.parse(localStorage.getItem("allcustomers") || "[]")
  );
  
  
  useEffect(() => {
    getallcustomers();
  }, []);

  const getallcustomers = async () => {
    const allCustomers = await getallCustomers<Icustomer>();
    localStorage.setItem("allcustomers", JSON.stringify(allCustomers));
    Dispatch({
      type: IActiontype.GET_CUSTOMERS,
      payload: JSON.stringify(allCustomers),
    });
  };

const HandleupdateCustomer = async (selectedcutomer:Icustomer) => {
    Dispatch({
      type: IActiontype.UPDATE_CUSTOMER,
      payload: JSON.stringify(selectedcutomer),
    });

  };

const DeleteCustomer = (id:number) => {
  Dispatch({
    type: IActiontype.REMOVE_CUSTOMER,
    payload: JSON.stringify(id),
  });
}

const HandleNewCustomer = (newcustomer:Icustomer) => {
  Dispatch({
    type: IActiontype.ADD_CUSTOMER,
    payload: JSON.stringify(newcustomer),
  });

}

const checkCustomerbymail = async (customer:Icustomer) =>{
  const emailcheck = await checkCustomerEmail<ICustomerCheck>(customer.email);

if (!emailcheck.exists) {
 const customerid =  await postCustomer<Icustomer>(customer)
return customerid
}
 
if (emailcheck.exists) {
 return emailcheck.customer.id
}
}
  

    return {getallcustomers, customers, HandleupdateCustomer, DeleteCustomer,HandleNewCustomer,checkCustomerbymail }
}


