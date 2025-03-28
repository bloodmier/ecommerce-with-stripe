import { useOrder } from "../../../hooks/useOrder";
import { ChangeEvent, useState } from "react";
import { IOrder, IupdateOrderQuantity } from "../../../models/Iorder";
import { OrderModal } from "../../../components/OrderModal";
import { OrderTable } from "../../../components/orderTable";
import "../../../sass/adminorderpage.scss";
import {
  deleteOrderapi,
  deleteOrderItemapi,
  getOrderById,
  postOrder,
  updateOrderapi,
  updateOrderItemQuantity,
} from "../../../service/Orderservices";
import {
  Box,
  Button,
  Pagination,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { NeworderModal } from "../../../components/NeworderModal";
import { CustomerModal } from "../../../components/CustomerModal";
import { useCustomer } from "../../../hooks/useCustomer";
import { Icustomer } from "../../../models/Icustomer";
import { updateCustomerapi } from "../../../service/Customerservices";

export const Adminorderpage = () => {
  const neworder: IOrder = {
    id: 0,
    customer_id: 0,
    payment_status: "Pending",
    payment_id: "null",
    order_status: "Pending",
    order_items: [],
  };
  const newcustomer: Icustomer = {
    isNew: true,
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
    created_at: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isUpdateCustomerModalOpen, setIsUpdateCustomerModalOpen] =
    useState(false);
  const [selectedorder, setSelectedorder] = useState<IOrder>(neworder);
  const [customer, setCustomer] = useState<Icustomer>(newcustomer);
  const { orders, HandleupdateOrder, DeleteOrder, setRefreshOrders } =
    useOrder();
  const { customers, HandleupdateCustomer } = useCustomer();
  const [currentPage, setCurrentPage] = useState(1);
  const orderPerPage = 10;
  const indexOfLastOrder = currentPage * orderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage;

  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm)
  );
  const paginatedOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setSelectedorder({ ...selectedorder, [name]: value });
    setCustomer({ ...customer, [name]: value });
  };

  const handleEdit = async (id: number) => {
    try {
      const order = await getOrderById<IOrder>(id);
      setSelectedorder(order);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      DeleteOrder(id);
      await deleteOrderapi(id);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleSave = async () => {
    try {
      HandleupdateOrder(selectedorder);
      setIsModalOpen(false);
      await updateOrderapi(selectedorder.id, selectedorder);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleNewOrder = async (newOrder: IOrder) => {
    await postOrder<IOrder>(newOrder);
    setRefreshOrders((prev) => !prev);
  };

  const handleProductQuantity = async (
    productId: number,
    newQuantity: number
  ) => {
    console.log(newQuantity);
    const updateditem: IupdateOrderQuantity = {
      quantity: newQuantity,
    };
    await updateOrderItemQuantity(productId, updateditem);
  };

  const handleRemoveProduct = async (productId: number) => {
    await deleteOrderItemapi(productId);
    setSelectedorder((prevOrder) => ({
      ...prevOrder,
      order_items: prevOrder.order_items.filter(
        (item) => item.id !== productId
      ),
    }));
  };

  const handleUpdatecustomer = async (id: number) => {
    setIsUpdateCustomerModalOpen(true);
    const selectedcustomer: Icustomer | undefined = customers.find(
      (c) => c.id === id
    );
    if (!selectedcustomer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    setCustomer(selectedcustomer);
  };

  const handleSaveonCustomer = async () => {
    try {
      HandleupdateCustomer(customer);
      setIsUpdateCustomerModalOpen(false);
      await updateCustomerapi(customer.id, customer);
      setRefreshOrders((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateCustomerModalOpen(false);
    }
  };

  const handleChangeCustomer = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handlepageChange = (_: ChangeEvent<unknown>, Value: number) => {
    setCurrentPage(Value);
  };

  return (
    <div
      id="admin-order-page"
      style={{
        backgroundColor: "white",
        marginTop: "25px",
        borderRadius: "15px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", margin: "15px" }}>
        <TextField
          label="Search Orders"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID"
          sx={{
            backgroundColor: "white",
          }}
        />
      </Box>
      {paginatedOrders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <OrderTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          orders={paginatedOrders}
          updatecustomer={handleUpdatecustomer}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "15px",
        }}
      >
        <Button
          onClick={() => setIsNewOrderModalOpen(true)}
          variant="contained"
        >
          New order
        </Button>
        <Pagination
          count={Math.ceil(filteredOrders.length / orderPerPage)}
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

      <OrderModal
        updateProductQuantity={handleProductQuantity}
        removeProduct={handleRemoveProduct}
        formOrder={selectedorder}
        onSave={handleSave}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleChange={handleChange}
      ></OrderModal>
      <NeworderModal
        neworder={neworder}
        onSave={handleNewOrder}
        onClose={() => setIsNewOrderModalOpen(false)}
        isOpen={isNewOrderModalOpen}
      ></NeworderModal>
      <CustomerModal
        formCustomer={customer}
        isOpen={isUpdateCustomerModalOpen}
        onSave={handleSaveonCustomer}
        onClose={() => setIsUpdateCustomerModalOpen(false)}
        handleChange={handleChangeCustomer}
      />
    </div>
  );
};
