import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Modal,
  TextField
} from "@mui/material";
import axios from "../api/axios";

type Playlist = {
  _id: string;
  name: string;
  description: string;
};

const DashboardPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get("/playlists");
      setPlaylists(res.data);
    } catch (err) {
      alert("Failed to fetch playlists.");
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("/playlists", formData);
      setFormData({ name: "", description: "" });
      setOpen(false);
      fetchPlaylists();
    } catch (err) {
      alert("Failed to create playlist.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/playlists/${id}`);
      fetchPlaylists();
    } catch (err) {
      alert("Failed to delete playlist.");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>🎵 My Playlists</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + New Playlist
        </Button>
      </Box>

      <Grid container spacing={3}>
        {playlists.map((pl) => (
          <Grid item xs={12} sm={6} md={4} key={pl._id} component="div">
            <Card>
              <CardContent>
                <Typography variant="h6">{pl.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pl.description || "No description"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="error" onClick={() => handleDelete(pl._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          p={4}
          bgcolor="white"
          borderRadius={2}
          width="90%"
          maxWidth={400}
          mx="auto"
          mt="15%"
          boxShadow={10}
        >
          <Typography variant="h6" mb={2}>Create Playlist</Typography>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
          />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardPage;
