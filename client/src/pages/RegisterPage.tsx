import { useState } from "react";
import axios from "../api/axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", { email, password });
      alert("Registered! Please log in.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h4" mb={2}>Register</Typography>
      <TextField fullWidth label="Email" onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth label="Password" type="password" onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button fullWidth variant="contained" onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default RegisterPage;
