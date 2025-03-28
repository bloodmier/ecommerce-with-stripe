import {
    Modal,
    TextField,
    Button,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    InputLabel,
  } from "@mui/material";
  import { ChangeEvent, useState } from "react";
  import { IOrder, IOrderitem } from "../models/Iorder";
import { OrderItem } from "./OrderItem";
  
  interface OrderModalProps {
    formOrder: IOrder;
    isOpen: boolean;
    onSave: () => void;
    onClose: () => void;
    handleChange: (
      e:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => void;
    updateProductQuantity: (productId: number, newQuantity: number) => void;  
    removeProduct: (productId: number) => void; 
  }
  
  export const OrderModal = ({
    isOpen,
    formOrder,
    onSave,
    onClose,
    handleChange,
    updateProductQuantity,
    removeProduct
  }: OrderModalProps) => {
    const [isProductListVisible, setProductListVisible] = useState(false);
  
    const toggleProductList = () => {
      setProductListVisible(!isProductListVisible);
    };
    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className="Position-order-modal">
          <h2>{formOrder.id ? "Edit Order" : "Add Order"}</h2>
          <FormControl fullWidth>
            <InputLabel>Payment Status</InputLabel>
            <Select
              value={formOrder.payment_status}
              name="payment_status"
              onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
            >
              <MenuItem value="unpaid">unpaid</MenuItem>
              <MenuItem value="paid">paid</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Refunded">Refunded</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Payment ID"
            value={formOrder.payment_id === "null" ? "" : formOrder.payment_id}
            name="payment_id"
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Order Status</InputLabel>
            <Select
              value={formOrder.order_status}
              name="order_status"
              onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Received">Received</MenuItem>
              <MenuItem value="Authorized">Authorized</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
              <MenuItem value="Refunded">Refunded</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
            </Select>
          </FormControl>
          <Button color="primary" onClick={toggleProductList}>
            {isProductListVisible ? "Hide Products" : "Show Products"}
          </Button>
          {isProductListVisible && (
            <div>
              {formOrder.order_items.map((product:IOrderitem) => (
                <OrderItem
                key={product.id}
                product={product}
                onUpdateQuantity={updateProductQuantity}
                onRemoveProduct={removeProduct}
              />
              ))}
            </div>
          )}
          <Button color="success" onClick={onSave}>
            Save
          </Button>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  };
  