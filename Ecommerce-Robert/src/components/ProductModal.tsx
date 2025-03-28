import {
  Modal,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ChangeEvent } from "react";
import { IProduct } from "../models/Iproduct";

interface ProductModalProps {
  isOpen: boolean;
  formProduct: IProduct;
  onSave: () => void;
  onClose: () => void;
  handleChange: (
    e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => void;
}

export const ProductModal = ({
  isOpen,
  formProduct,
  onSave,
  onClose,
  handleChange,
}: ProductModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="position-modal">
        <h2>{formProduct.id ? "Edit Product" : "Add Product"}</h2>
        <TextField
          label="Name"
          value={formProduct.name}
          name="name"
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          value={formProduct.description}
          name="description"
          onChange={handleChange}
          required
        />
        <TextField
          label="Price"
          value={formProduct.price}
          name="price"
          type="number"
          onChange={handleChange}
          required
        />
        <TextField
          label="Stock"
          value={formProduct.stock}
          name="stock"
          type="number"
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={formProduct.category}
          name="category"
          onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
          required
        >
          <MenuItem value="Handtools">Handtools</MenuItem>
          <MenuItem value="Electrictools">Electrictools</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        </FormControl>
        <TextField
          label="Image"
          value={formProduct.image}
          name="image"
          onChange={handleChange}
          required
        />
        <Button onClick={onSave} color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
