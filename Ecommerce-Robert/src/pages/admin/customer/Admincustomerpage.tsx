import { ChangeEvent, useState } from "react";
import { useCustomer } from "../../../hooks/useCustomer";
import { Box, Button, Pagination, TextField } from "@mui/material";
import { Icustomer } from "../../../models/Icustomer";
import "../../../sass/admincustomerpage.scss";
import {
  checkCustomerEmail,
  deleteCustomerapi,
  postCustomer,
  updateCustomerapi,
} from "../../../service/Customerservices";
import { CustomerTable } from "../../../components/CustomerTable";
import { CustomerModal } from "../../../components/CustomerModal";
import { ICustomerCheck } from "../../../models/Icustomercheck";

export const Admincustomerpage = () => {
  const { customers, HandleupdateCustomer, DeleteCustomer, HandleNewCustomer } =
    useCustomer();
  const [currentPage, setCurrentPage] = useState(1);
  const customerPerPage = 8;
  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomer = customers.filter(
    (customer) =>
      customer.id?.toString().includes(searchTerm) ||
      customer.firstname?.toLowerCase().toString().includes(searchTerm)
  );
  const paginatedProducts = filteredCustomer.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const newcustomer = {
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
  const [selectedcustomer, setSelectedcustomer] =
    useState<Icustomer>(newcustomer);

  const handleCreate = () => {
    setSelectedcustomer(newcustomer);
    setIsModalOpen(true);
  };

  const handleEdit = (customer: Icustomer) => {
    setSelectedcustomer(customer);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (selectedcustomer.isNew) {
        const emailCheck = await checkCustomerEmail<ICustomerCheck>(selectedcustomer.email)

        const { firstname,lastname,email,city,country,password,phone,postal_code,street_address} = selectedcustomer
        
        if (emailCheck.exists) {
          const updatedcustomer = {
            id: emailCheck.customer.id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone,
            street_address: street_address,
            postal_code:postal_code,
            city: city,
            country: country,
            created_at: "",
          };
          await updateCustomerapi(emailCheck.customer.id,updatedcustomer)
          HandleupdateCustomer(updatedcustomer)
       }else {
         const newcustomerid: Icustomer = await postCustomer(selectedcustomer);
         const updatedcustomer = {
          id: Number(newcustomerid),
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone: phone,
          street_address: street_address,
          postal_code:postal_code,
          city: city,
          country: country,
          created_at: "",
        };
         HandleNewCustomer(updatedcustomer);
         
       }
      } else {
        HandleupdateCustomer(selectedcustomer);
        setIsModalOpen(false);
        await updateCustomerapi(selectedcustomer.id, selectedcustomer);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSelectedcustomer({ ...selectedcustomer, [name]: value });
  };

  const handleDelete = async (id: number) => {
    DeleteCustomer(id);
    await deleteCustomerapi(id);
  };

  const handlepageChange = (_: ChangeEvent<unknown>, Value: number) => {
    setCurrentPage(Value);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        marginTop: "25px",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <form autoComplete="off">
        <TextField
          label="Search Customer"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID or name"
        />
        </form>
      </Box>
      <CustomerTable
        customers={paginatedProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></CustomerTable>
      <CustomerModal
        onSave={handleSave}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleChange={handleChange}
        formCustomer={selectedcustomer}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "15px",
        }}
      >
        <Button onClick={() => handleCreate()} variant="contained">
          Add
        </Button>
        <Pagination
          count={Math.ceil(customers.length / customerPerPage)}
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
