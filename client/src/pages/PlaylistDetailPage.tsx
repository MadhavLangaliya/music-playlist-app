import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
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
  description: string;
  songs: Song[];
};

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get(`/playlists/${id}`);
      setPlaylist(res.data);
    } catch {
      alert("Failed to load playlist");
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  return (
    <Box p={4}>
      <Button variant="outlined" onClick={() => navigate("/")}>← Back to Dashboard</Button>

      {playlist && (
        <>
          <Typography variant="h4" mt={2} mb={1}>
            {playlist.name}
          </Typography>
          <Typography variant="subtitle1" mb={3} color="text.secondary">
            {playlist.description}
          </Typography>

          <Grid container spacing={3}>
            {playlist.songs.length === 0 && (
              <Typography>No songs added to this playlist yet.</Typography>
            )}

            {playlist.songs.map((song) => (
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;
