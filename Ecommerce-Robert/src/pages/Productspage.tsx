import { Box, Button, Pagination, TextField, Typography } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { IProduct } from "../models/Iproduct";
import { IcartItem } from "../models/IcartItem";
import { IActiontype } from "../reducers/cartreducer";
import { Loading } from "../components/Loading";

export const Productspage = () => {
  const { products,getallproducts,isloading } = useProducts();
  const { dispatch } = useContext(CartContext);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomer = products.filter((product) =>
    product.name.toLowerCase().toString().includes(searchTerm)
  );
  const paginatedProducts = filteredCustomer.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(()=>{
    getallproducts()
  },[])


  const handleaddingcartitem = (product: IProduct) => {
    const { id, name, price, image } = product;
    const quantity = quantities[product.id] || 1;
    const cartItem: IcartItem = { id, name, price, quantity, image };
    dispatch({
      type: IActiontype.ADD_CARTITEM,
      payload: JSON.stringify(cartItem),
    });
    setQuantities({});
  };

  const handleQuantitychange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const value = Math.max(1, +e.target.value);
    setQuantities((Quantities) => ({
      ...Quantities,
      [id]: value,
    }));
  };

  const handlepageChange = (_: ChangeEvent<unknown>, Value: number) => {
    setCurrentPage(Value);
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "1000px",
        flexDirection: "column",
        gap: "2rem",
        backgroundColor: "var(--surface-color)",
        borderRadius: "15px",
        boxshadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    > 
      <Box
        sx={{
          width: "85%",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="var(--primary-color)">
          All Products
        </Typography>
        <TextField
          label="Search Products"
          variant="standard"
          color="primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
          size="medium"
        />
      </Box>
      {paginatedProducts.length === 0 ? (
        <Typography sx={{ color: "white" }}>
          Could't find any product whit that name, please try again!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {isloading ? <Loading/> : paginatedProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                textAlign: "center",
                width: "15rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <Typography variant="h6" color="var(--text-color)">
                {product.name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="var(--primary-color)">
                  {product.price} kr
                </Typography>
                <Typography color="var(--accent-color)">
                  {product.stock > 0
                    ? `Stock: ${product.stock}`
                    : "Out of stock"}
                </Typography>
              </Box>
              <TextField
                label="Count"
                type="number"
                size="small"
                variant="outlined"
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantitychange(e, product.id)}
                sx={{ width: "100%" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  href={`/products/${product.id}`}
                  fullWidth
                  sx={{
                    fontSize: "0.8rem",
                    "&:hover": {
                      color: "white",
                    },
                  }}
                >
                  Show more
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  onClick={() => handleaddingcartitem(product)}
                >
                  Add to cart
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "35px",
          width: "100%",
          marginRight: "150px",
        }}
      >
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={handlepageChange}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
            },
          }}
        />
      </Box>
    </Box>
  );
};
