import { useEffect, useState, ChangeEvent } from "react";
import { ProductTable } from "../../../components/ProductTable";
import { ProductModal } from "../../../components/ProductModal";
import { useProducts } from "../../../hooks/useProducts";
import "../../../sass/adminproductpage.scss";
import {
  Button,
  SelectChangeEvent,
  Pagination,
  Box,
  TextField,
  Typography,
} from "@mui/material";

export const Adminproductspage = () => {
  const {
    getallproducts,
    products,
    product,
    HandleupdateProduct,
    updateproduct,
    getproduct,
    createproduct,
    deleteproduct,
  } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(
    (product) =>
      product.id.toString().includes(searchTerm) ||
      product.name.toLowerCase().toString().includes(searchTerm)
  );
  const paginatedProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getallproducts();
  }, []);

  const handleCreate = () => {
    setIsModalOpen(true);
    getproduct(0);
  };

  const handleEdit = (productId: number) => {
    setIsModalOpen(true);
    getproduct(productId);
  };

  const handleSave = async () => {
    if (product.id === 0) {
      await createproduct();
    } else {
      await updateproduct(product.id);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    await deleteproduct(id);
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    HandleupdateProduct(name, value);
  };

  const handlepageChange = (_: ChangeEvent<unknown>, Value: number) => {
    setCurrentPage(Value);
  };

  return (
    <div
      id="admin-product-page"
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        marginTop: "15px",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Product ID or name"
        />
      </Box>
      {paginatedProducts.length === 0 ? (
        <Typography>Couldn't find any product with that search!</Typography>
      ) : (
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <ProductModal
        isOpen={isModalOpen}
        formProduct={product}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
        handleChange={handleChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "15px",
        }}
      >
        <Button onClick={handleCreate} variant="contained">
          Add Product
        </Button>
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
    </div>
  );
};
