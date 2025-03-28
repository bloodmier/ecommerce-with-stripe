import { RowDataPacket } from "mysql2";
import { IcartItem } from "./ICartitem";


    export interface ICreatePaymentRequest extends RowDataPacket {
        line_items: IcartItem[];
        order_id: string;
    }
  