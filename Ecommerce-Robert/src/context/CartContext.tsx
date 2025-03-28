import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { cartReducer, IAction } from "../reducers/cartreducer";
import { IcartItem } from "../models/IcartItem";
export interface ICartContext {
    cart:IcartItem[]
    dispatch: Dispatch<IAction>
}

export const CartContext = createContext<ICartContext>({cart:[],dispatch: () => {return}})


export const CartProvider = ({children}:PropsWithChildren) => {

const [cart , dispatch] = useReducer(cartReducer,JSON.parse(localStorage.getItem("cartitems") ||"[]"))

useEffect(()=>{
    localStorage.setItem("cartitems", JSON.stringify(cart))
},[cart])

    return <>
    <CartContext.Provider value={{cart, dispatch}}>
    {children}
    </CartContext.Provider> 
        </>
};