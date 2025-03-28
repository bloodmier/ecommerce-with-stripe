import {
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { IOrder } from "../models/Iorder";

interface OrderModalProps {
  neworder: IOrder;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newOrder: IOrder) => void;
}

export const NeworderModal = ({
  isOpen,
  onClose,
  onSave,
  neworder,
}: OrderModalProps) => {
  const [newOrder, setNewOrder] = useState<IOrder>(neworder);
  const [selectedProduct, setSelectedProduct] = useState<number | "">("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewOrder((order) => ({
      ...order,
      [name]: value,
    }));
  };

  const addProductToOrder = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (product) {
      const existingProduct = newOrder.order_items.find(
        (item) => item.product_id === product.id
      );

      if (existingProduct) {
        setNewOrder((order) => ({
          ...order,
          order_items: order.order_items.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + itemQuantity }
              : item
          ),
        }));
      } else {
        setNewOrder((order) => ({
          ...order,
          order_items: [
            ...order.order_items,
            {
              id: Date.now(),
              product_id: product.id,
              product_name: product.name,
              quantity: itemQuantity,
              unit_price: product.price,
            },
          ],
        }));
      }
      setSelectedProduct("");
      setItemQuantity(1);
    }
  };

  const removeOrderItem = (itemId: number) => {
    setNewOrder((order) => ({
      ...order,
      order_items: order.order_items.filter((item) => item.id !== itemId),
    }));
  };

  const handleSave = () => {
    onSave(newOrder);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "800px",
          margin: "auto",
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography variant="h6">Create New Order</Typography>
        <TextField
          label="Customer ID"
          name="customer_id"
          value={newOrder.customer_id}
          onChange={handleChange}
          type="number"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Payment Status</InputLabel>
          <Select
            name="payment_status"
            value={newOrder.payment_status}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
            <MenuItem value="Refunded">Refunded</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Order Status</InputLabel>
          <Select
            name="order_status"
            value={newOrder.order_status}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Received">Received</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1">Available Products</Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID or Name"
        />

        <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price} SEK</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setSelectedProduct(product.id)}
                      color="primary"
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        {selectedProduct && (
          <Box sx={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            <TextField
              label="Selected Product"
              value={products.find((p) => p.id === selectedProduct)?.name || ""}
              fullWidth
            />
            <TextField
              label="Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              type="number"
              fullWidth
            />
            <Button onClick={addProductToOrder} variant="contained">
              Add
            </Button>
          </Box>
        )}
        <Typography variant="subtitle1">Order Items</Typography>
        {newOrder.order_items.map((item) => (
          <Box
            key={item.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>
              {item.product_name} - Quantity: {item.quantity} - Price:{" "}
              {item.unit_price}
            </Typography>
            <Button
              onClick={() => removeOrderItem(item.id)}
              color="error"
              variant="text"
            >
              Remove
            </Button>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
