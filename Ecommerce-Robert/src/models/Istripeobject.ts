import { IcartItem } from "./IcartItem"

export interface Istripeobject {
    line_items:IcartItem[]
    order_id:number  
    clientSecret: string
}