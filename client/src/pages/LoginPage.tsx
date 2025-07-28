import React, { useState } from "react";
import axios from "../api/axios";
import { TextField, Button, Typography, Box, Link as MuiLink } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      login(res.data.token); // Sets token in localStorage + updates context
      toast.success("Login successful!");
      navigate("/"); // navigate to dashboard
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h4" mb={2}>Login</Typography>
      <TextField
        fullWidth
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>

      <Typography mt={3} textAlign="center">
        Don't have an account?{" "}
        <MuiLink component={Link} to="/register">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginPage;
