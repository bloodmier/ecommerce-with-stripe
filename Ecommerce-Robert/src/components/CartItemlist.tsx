import {
  Box,
  Divider,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import { IcartItem } from "../models/IcartItem";
import { useProducts } from "../hooks/useProducts";
import { IProduct } from "../models/Iproduct";

interface Ipropscartitemlist {
  cart: IcartItem[];
  handleDelete: (id: number) => void;
  handleQuantityChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => void;
  onsubmit: () => void;
}

export const Cartitemlist = ({
  cart,
  handleDelete,
  handleQuantityChange,
  onsubmit,
}: Ipropscartitemlist) => {
  const [hideButton, setHidebutton] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [insufficientStock, setInsufficientStock] = useState<IProduct[]>([]);

  const { products } = useProducts();

  const removebotton = () => {
    setHidebutton(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const checkStock = () => {
    const cartprodId = cart.map((c) => c.id);
    const getrightproducts = products.filter((p) => cartprodId.includes(p.id));

    const insufficientStock = getrightproducts.filter((product) => {
      const cartItem = cart.find((c) => c.id === product.id);
      return cartItem && cartItem.quantity > product.stock;
    });
    setInsufficientStock(insufficientStock);

    if (insufficientStock.length > 0) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    checkStock();
  }, [cart]);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Your cart
      </Typography>
      {openDialog && (
        <div>
          <Typography variant="body2" component="h1" gutterBottom>
            Some products in your cart do not have enough stock to fulfill the
            requested quantities. These items will be shipped as soon as they
            are back in stock. Would you like to continue with your order?
          </Typography>
          <Button
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            variant="contained"
            color="success"
            size="small"
            onClick={() => setOpenDialog(false)}
            fullWidth
          >
            Yes
          </Button>
          <Typography sx={{ borderBottom: "1px solid black" }}>
            Products with to low stock
          </Typography>
          {insufficientStock.map((i) => (
            <Typography key={i.id} variant="body2">
              Produkt {i.name} - stock {i.stock > 0 ? i.stock : "0"}.
            </Typography>
          ))}
        </div>
      )}

      <Divider sx={{ marginBottom: "20px" }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "5px",
                      objectFit: "contain",
                    }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <TextField
                    label="Antal"
                    type="number"
                    size="small"
                    value={item.quantity}
                    sx={{
                      width: "4rem",
                      padding: "0",
                      margin: "0",
                    }}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                  ></TextField>
                </TableCell>
                <TableCell>{item.price} kr</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ margin: "20px 0" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">{calculateTotal()} kr</Typography>
      </Box>
      {!hideButton && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "20px" }}
          onClick={() => {
            onsubmit();
            removebotton();
          }}
          disabled={openDialog}
        >
          Proced to Checkout
        </Button>
      )}
    </Box>
  );
};
