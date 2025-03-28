import { IProduct } from "../models/Iproduct";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

interface ProductTableProps {
  products: IProduct[];
  onEdit: (productId: number) => void;
  onDelete: (id: number) => void;
}

export const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  return (
    <Table sx={{
      backgroundColor:"white",
      marginTop: "25px"
    }}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell><img src={product.image} alt={product.name} /></TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price} kr</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Button
                color="primary"
                size="small"
                onClick={() => onEdit(product.id)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Button
                color="error"
                size="small"
                onClick={() => onDelete(product.id)}
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
