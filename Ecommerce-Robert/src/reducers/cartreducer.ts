import { IcartItem } from "../models/IcartItem";


export interface IAction {
    type: IActiontype;
    payload: string;
}

export enum IActiontype {
  GET_CARTITEM,
  ADD_CARTITEM,
  REMOVE_CARTITEM,
  REMOVE_ALL_CARTITEM,
  UPDATE_CARTITEMS
}

export const cartReducer = (cartitem: IcartItem[],action: IAction): IcartItem[] => {
  switch (action.type) {
    case IActiontype.ADD_CARTITEM:
        const item = JSON.parse(action.payload)
        if (typeof item.id !== "number" || typeof item.quantity !== "number") {
          throw new Error("Invalid payload structure");
      }
        const existingitem = cartitem.find((c)=> c.id === item.id)
        if (existingitem){
        return cartitem.map((c)=> c.id === item.id 
        ? {...c, quantity: c.quantity + item.quantity}
        : c
        )

        }else {
        return [...cartitem, item]
        }
        case IActiontype.UPDATE_CARTITEMS: {
          const { newquantity, Id } = JSON.parse(action.payload);
          if (Number(newquantity) === 0) {
            const updatedCart = cartitem.filter((c) => c.id !== Id);
            return updatedCart;
          }
          const updatedCartQuantity = cartitem.map((c) =>
            c.id === Id ? { ...c, quantity: Number(newquantity) } : c
          );
          return updatedCartQuantity;
        }
        
    case IActiontype.REMOVE_CARTITEM:
      const id = JSON.parse(action.payload)
      return cartitem.filter((c)=> c.id !== id)

    case IActiontype.REMOVE_ALL_CARTITEM:
      
      return [];



    default:
      return cartitem;
  }
};
