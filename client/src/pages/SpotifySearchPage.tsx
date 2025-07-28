import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem
} from "@mui/material";
import axios from "../api/axios";

type Song = {
  spotifyId: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
};

type Playlist = {
  _id: string;
  name: string;
};

const SpotifySearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get("/playlists");
      setPlaylists(res.data);
    } catch (err) {
      alert("Failed to load playlists");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/spotify/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      alert("Search failed");
    }
  };

  const handleAddToPlaylist = async () => {
    if (!selectedSong || !selectedPlaylistId) return;
    try {
      await axios.post(`/playlists/${selectedPlaylistId}/songs`, selectedSong);
      alert("✅ Song added to playlist!");
      setOpenDialog(false);
      setSelectedPlaylistId("");
    } catch (err) {
      alert("❌ Failed to add song");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>🎶 Spotify Search</Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Search for a song"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {results.map((song) => (
          <Grid item xs={12} sm={6} md={4} key={song.spotifyId} component="div">
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={song.imageUrl}
                alt={song.title}
              />
              <CardContent>
                <Typography variant="h6">{song.title}</Typography>
                <Typography variant="body2">{song.artist}</Typography>
                <Typography variant="caption">{song.album}</Typography>
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedSong(song);
                      setOpenDialog(true);
                    }}
                  >
                    + Add to Playlist
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Playlist Selection Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Playlist</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Playlist"
            value={selectedPlaylistId}
            onChange={(e) => setSelectedPlaylistId(e.target.value)}
            margin="normal"
          >
            {playlists.map((pl) => (
              <MenuItem key={pl._id} value={pl._id}>
                {pl.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToPlaylist}
            disabled={!selectedPlaylistId}
          >
            Add Song
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SpotifySearchPage;
