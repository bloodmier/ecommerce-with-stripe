import { Box, Typography, Button, TextField } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router";
import { ChangeEvent, useContext, useState } from "react";
import { IcartItem } from "../models/IcartItem";
import { IProduct } from "../models/Iproduct";
import { IActiontype } from "../reducers/cartreducer";
import { CartContext } from "../context/CartContext";

export const Productpage = () => {
  const { id } = useParams();
  const productId = parseInt(id || "");
  const { products } = useProducts();
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === productId);

  const handleaddingcartitem = (product: IProduct) => {
    const { id, name, price, image } = product;
    const cartItem: IcartItem = { id, name, price, quantity, image };
    dispatch({
      type: IActiontype.ADD_CARTITEM,
      payload: JSON.stringify(cartItem),
    });
    setQuantity(1);
  };

  const handleQuantitychange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value);
  };

  if (!product) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" color="error">
          Could't find the product
        </Typography>
        <Typography>Check if the id i correct</Typography>
        <Button variant="contained" color="primary" href="/products">
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: "30rem",
        backgroundColor: "white",
        borderRadius: "15px",
        marginTop: "25px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      />
      <Typography variant="h4" gutterBottom color="var(--text-color)">
        {product.name}
      </Typography>
      <Typography variant="body1" color="rgb(44, 44, 44);">
        {product.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h6" color="primary">
          Price: {product.price} kr
        </Typography>
        <Typography variant="h6" color="var(--accent-color)">
          Stock: {product.stock > 0 ? product.stock : "Out of stock"}
        </Typography>
      </Box>
      <TextField
        label="Antal"
        type="number"
        size="small"
        variant="outlined"
        defaultValue={1}
        sx={{ width: "100%" }}
        InputProps={{
          inputProps: {
            min: 1,
          },
        }}
        onChange={handleQuantitychange}
      />
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => handleaddingcartitem(product)}
      >
        Add to cart
      </Button>
    </Box>
  );
};
