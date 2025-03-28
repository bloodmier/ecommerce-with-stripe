import { useReducer, useState, useEffect } from "react";
import { productReducer, IActiontype } from "../reducers/productreducer";
import {
  deleteProductapi,
  getProductById,
  getProducts,
  postProduct,
  updateProductapi,
} from "../service/Productsservices";
import { IProduct } from "../models/Iproduct";


export const useProducts = () => {
  const [isloading,setIsloading] = useState<boolean>(false)
  const [products, Dispatch] = useReducer(
    productReducer,
    JSON.parse(localStorage.getItem("allProducts") || "[]")
  );

  const [product, setProduct] = useState<IProduct>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(products));
  }, [products]);

  const getallproducts = async () => {
    try {
      setIsloading(true)
      const allProducts = await getProducts<IProduct[]>();
      Dispatch({
        type: IActiontype.GET_PRODUCTS,
        payload: JSON.stringify(allProducts),
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }finally {
      setIsloading(false)
    }
  };

  const getproduct = async (id: number) => {
    try {
      const productFromApi = id === 0 ? {
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
      } : await getProductById<IProduct>(id);

      setProduct(productFromApi);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const HandleupdateProduct = (name: string, value: string | number) => {
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const updateproduct = async (id: number) => {
    try {
      await updateProductapi(id, product);
      Dispatch({
        type: IActiontype.UPDATE_PRODUCT,
        payload: JSON.stringify(product),
      });
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const createproduct = async () => {
    try {
      const createdProduct = await postProduct(product) as {
        id: number;
        message: string;
      };
      Dispatch({
        type: IActiontype.ADD_PRODUCT,
        payload: JSON.stringify({ ...product, id: createdProduct.id }),
      });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const deleteproduct = async (id: number) => {
    try {
      await deleteProductapi(id);
      Dispatch({
        type: IActiontype.REMOVE_PRODUCT,
        payload: JSON.stringify(id),
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return {
    getallproducts,
    products,
    product,
    HandleupdateProduct,
    updateproduct,
    getproduct,
    createproduct,
    deleteproduct,
    isloading
  };
};
