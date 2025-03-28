import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Icustomer } from "../models/Icustomer";

interface CustomerTableProps {
    customers: Icustomer[];
    onEdit: (customer: Icustomer) => void;
    onDelete: (id: number) => void;
  }
  
  export const CustomerTable = ({ customers, onEdit, onDelete }: CustomerTableProps) => {
    return (
      <Table sx={{
        backgroundColor: "white",
        marginTop: "25px"
      }}>
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Street</TableCell>
            <TableCell>Zip-code</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.firstname}</TableCell>
              <TableCell>{c.lastname}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.country}</TableCell>
              <TableCell>{c.password}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.street_address}</TableCell>
              <TableCell>{c.postal_code}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(c)}>Edit</Button>
                <Button onClick={() => onDelete(c.id)} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  