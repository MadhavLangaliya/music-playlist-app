import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import axios from "../api/axios";

type Song = {
  spotifyId: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
};

const SpotifySearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/spotify/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      alert("Search failed");
    }
  };

  const handleAddToPlaylist = async (song: Song) => {
    const playlistId = prompt("Enter Playlist ID to add song to:");
    if (!playlistId) return;
    try {
      await axios.post(`/playlists/${playlistId}/songs`, song);
      alert("Song added!");
    } catch (err) {
      alert("Failed to add song");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>🔍 Search Spotify</Typography>
      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Search songs"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>

      <Grid container spacing={3}>
        {results.map((song) => (
          <Grid item xs={12} sm={6} md={4} key={song.spotifyId} component="div">
            <Card>
              <CardMedia component="img" height="140" image={song.imageUrl} alt={song.title} />
              <CardContent>
                <Typography variant="h6">{song.title}</Typography>
                <Typography variant="body2">{song.artist}</Typography>
                <Typography variant="caption">{song.album}</Typography>
                <Box mt={2}>
                  <Button variant="outlined" onClick={() => handleAddToPlaylist(song)}>
                    + Add to Playlist
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpotifySearchPage;
