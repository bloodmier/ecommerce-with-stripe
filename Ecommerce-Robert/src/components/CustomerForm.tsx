import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Icustomer } from "../models/Icustomer";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";


interface IpropsCustomerForm {
  onsubmit: (e:FormEvent,customer:Icustomer) => void
}



export const CustomerForm = ({onsubmit}: IpropsCustomerForm) => {
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
    country: "sweden",
    created_at: "",
  };
  const [customer, setCustomer] = useState<Icustomer>(() => {
    const storedCustomer = localStorage.getItem("Billingcustomer");
    return storedCustomer ? JSON.parse(storedCustomer) : newcustomer;
  });
 
  useEffect(() => {
    localStorage.setItem("Billingcustomer", JSON.stringify(customer));
  }, [customer]);
  

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={(e)=>onsubmit(e,customer)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "calc(100% - 50px)",
          height: "auto",
          border: "1px solid #aba5a5",
          borderRadius: "15px",
          margin: "25px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "15px" }}
        >
          Billing information
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            width: "90%",
            height: "auto",
          }}
        >
          <TextField
            type="text"
            label="Name"
            name="firstname"
            value={customer.firstname}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            label="Lastname"
            name="lastname"
            value={customer.lastname}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ flex: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            width: "90%",
            height: "auto",
          }}
        >
          <TextField
            type="text"
            label="E-mail"
            name="email"
            value={customer.email}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={(e) => {
              const regex = /^[0-9]*$/;
              if (regex.test(e.target.value)) {
                handleChange(e);
              }
            }}
            variant="outlined"
            required
            sx={{ flex: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            width: "90%",
            height: "auto",
          }}
        >
          <TextField
            type="text"
            label="Address"
            name="street_address"
            value={customer.street_address}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ width: "70%" }}
          />
          <TextField
            type="text"
            label="Zip"
            name="postal_code"
            value={customer.postal_code}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ flex: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            width: "90%",
            height: "auto",
            marginBottom: "2rem",
          }}
        >
          <TextField
            type="text"
            label="City"
            name="city"
            value={customer.city}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ flex: "1" }}
          />
          <FormControl sx={{ flex: "1" }}>
            <InputLabel id="select-label" sx={{ backgroundColor: "white" }}>
              Country
            </InputLabel>
            <Select
              labelId="select-label"
              name="country"
              value={customer.country}
              onChange={handleChange}
              sx={{ flex: "1" }}
            >
              <MenuItem value="sweden">Sweden</MenuItem>
              <MenuItem value="finland">Finland</MenuItem>
              <MenuItem value="norway">Norway</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" type="submit" sx={{ marginBottom: "25px", width: "90%" }}
        >
          Proceed to payment
        </Button>
      </Box>
    </>
  );
};
