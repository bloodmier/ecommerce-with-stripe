import React, { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import { IOrderitem } from "../models/Iorder";

interface OrderItemProps {
  product: IOrderitem;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemoveProduct: (id: number) => void;
}

export const OrderItem = ({
  product,
  onUpdateQuantity,
  onRemoveProduct,
}: OrderItemProps) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    onUpdateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    onRemoveProduct(product.id);
  };

  return (<>
      <Typography component="div">
        {product.product_name} - Unit Price: {product.unit_price} - Quantity: 
        <TextField
          value={quantity}
          onChange={handleQuantityChange}
          type="number"
          size="small"
          style={{ width: "60px", marginLeft: "10px" }}
        />
      <Button color="error" size="small" onClick={handleRemove}>
        Remove
      </Button>
      </Typography>
      </>
  );
};
