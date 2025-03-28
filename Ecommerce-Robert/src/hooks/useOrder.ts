import { useEffect, useReducer, useState } from "react"
import { IActiontype, orderReducer } from "../reducers/orderreducer"
import { getallOrders } from "../service/Orderservices"
import { IOrder } from "../models/Iorder"

export const useOrder = () => {

const [orders, Dispatch] = useReducer(orderReducer, JSON.parse(localStorage.getItem("Orderlist") || "[]"))
const [refreshOrders, setRefreshOrders] = useState(false);


useEffect(()=>{
    getorders()
},[refreshOrders])
    
const getorders = async () => {
    try {
        const allOrders = await getallOrders<IOrder>()
        localStorage.setItem("Orderlist", JSON.stringify(allOrders))
        Dispatch({
            type:IActiontype.GET_ORDERS,
            payload:JSON.stringify(allOrders),
        })
    } catch (error) {
        console.log("something wrong with getting orders" + error);  
    }
}


const HandleupdateOrder = async (selectedOrder:IOrder) => {
    Dispatch({
      type: IActiontype.UPDATE_ORDER,
      payload: JSON.stringify(selectedOrder),
    });
  };

  const DeleteOrder = (id:number) => {
    Dispatch({
      type: IActiontype.REMOVE_ORDER,
      payload: JSON.stringify(id),
    });
  }

  const HandleNewOrder = (neworder:IOrder) => {
    Dispatch({
      type: IActiontype.ADD_ORDER,
      payload: JSON.stringify(neworder),
    });
}

    return {orders,HandleupdateOrder, DeleteOrder ,HandleNewOrder,setRefreshOrders}
}