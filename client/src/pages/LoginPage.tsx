import React, { useState } from "react";
import axios from "../api/axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      console.log("Login success, redirecting to /");
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h4" mb={2}>Login</Typography>
      <TextField fullWidth label="Email" onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth label="Password" type="password" onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginPage;
