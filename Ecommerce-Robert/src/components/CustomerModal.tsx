import { Modal, TextField, Button } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { Icustomer } from "../models/Icustomer";

interface CustomerModalProps {
    formCustomer: Icustomer;
    isOpen: boolean;
    onSave: () => void;
    onClose: () => void;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  }
  
  export const CustomerModal = ({ isOpen, formCustomer, onSave, onClose, handleChange }: CustomerModalProps) => {
 
    const isFormValid = () => {
      const requiredFields: (keyof Icustomer)[] = [
        "firstname",
        "lastname",
        "email",
        "country",
        "phone",
        "street_address",
        "postal_code",
      ];
    
      return requiredFields.every((field) => {
        const value = formCustomer[field];
        const stringValue = typeof value === "number" ? value.toString() : value;
        return typeof stringValue === "string" && stringValue.trim() !== "";
      });
    };
  
  
    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className="Positon-modal">
          <h2>{formCustomer.id ? "Edit Customer" : "Add Customer"}</h2>
          <TextField
            label="Firstname"
            value={formCustomer.firstname}
            name="firstname"
            onChange={handleChange}
          />
          <TextField
            label="Lastname"
            value={formCustomer.lastname}
            name="lastname"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            value={formCustomer.email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            label="Country"
            value={formCustomer.country}
            name="country"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="text"
            value={formCustomer.password}
            name="password"
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            value={formCustomer.phone}
            name="phone"
            onChange={handleChange}
          />
          <TextField
            label="Street Address"
            value={formCustomer.street_address}
            name="street_address"
            onChange={handleChange}
          />
          <TextField
            label="Postal Code"
            value={formCustomer.postal_code}
            name="postal_code"
            onChange={handleChange}
          />
  
          <Button color="success" onClick={onSave} disabled={!isFormValid()}>
            Save
          </Button>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    );
  };
  