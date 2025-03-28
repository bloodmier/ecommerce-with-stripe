import { IOrder, IOrderWithCustomer } from "../models/Iorder";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

interface ProductTableProps {
  orders: IOrder[];
  onEdit: (productId:number) => void;
  onDelete: (id: number) => void;
  updatecustomer: (id:number)=> void;
}

export const OrderTable = ({
  orders,
  onEdit,
  onDelete,
  updatecustomer
}: ProductTableProps) => {
  return (
    <Table sx={{backgroundColor: "white", marginTop:"25px"}}>
      <TableHead>
        <TableRow>
          <TableCell>Edit customer</TableCell>
          <TableCell>Customer-id</TableCell>
          <TableCell>Customer-name</TableCell>
          <TableCell>Total-Price</TableCell>
          <TableCell>Payment id</TableCell>
          <TableCell>Payment Status</TableCell>
          <TableCell>Order Status</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            
            <TableCell ><Button onClick={()=>updatecustomer(order.customer_id)}>Edit</Button></TableCell>
            <TableCell >{order.customer_id}</TableCell>
            <TableCell>{(order as IOrderWithCustomer).customer_firstname}</TableCell>
            <TableCell>{order.total_price} kr</TableCell>
            <TableCell>{order.payment_id}</TableCell>
            <TableCell>{order.payment_status}</TableCell>
            <TableCell>{order.order_status}</TableCell>
            <TableCell>
              <Button
                color="primary"
                size="small"
                onClick={() => onEdit(order.id)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Button
                color="error"
                size="small"
                onClick={() => onDelete(order.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
