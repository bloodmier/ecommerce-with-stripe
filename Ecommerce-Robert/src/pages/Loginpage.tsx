import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Iuser } from "../models/Iuser";
import { Box, Typography, TextField, Button } from "@mui/material";

export const Loginpage = () => {
  const [user, setUser] = useState<Iuser>({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (user.username === "Admin" && user.password === "Password") {
      localStorage.setItem("authToken", "authenticated");
      navigate("/admin");
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setUser({ username: "", password: "" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        border: "1px solid lightgray",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor:"white"
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Authentication
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Username"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "1.5rem" }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};