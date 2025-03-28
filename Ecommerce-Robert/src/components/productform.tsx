import { ChangeEvent, FormEvent } from "react";
import { IProduct } from "../models/Iproduct";
import "../sass/adminupdatepage.scss"
interface ProductFormProps {
    product: IProduct;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent) => void;
  }

export const Productform = ({
    product,
    handleChange,
    handleSubmit,
  }:ProductFormProps) => {


    return <>
    <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Update Product</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product?.name || ""}
            onChange={handleChange}
          />
  
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product?.description || ""}
            onChange={handleChange}
            rows={6}
          />
  
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product?.price || 0}
            onChange={handleChange}
          />
  
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product?.stock || 0}
            onChange={handleChange}
          />
  
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={product?.category || ""}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="screwdriver">Screwdriver</option>
                <option value="hammer">Hammer</option>
                <option value="wrench">Wrench</option>
                <option value="pliers">Pliers</option>
                <option value="drill">Drill</option>
          </select>

          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product?.image || ""}
            onChange={handleChange}
          />
  
          <button type="submit">Submit</button>
        </form>
      </div>
        </>
};