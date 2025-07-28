const express = require('express');
const router = express.Router();
const getSpotifyAccessToken = require('../utils/spotifyToken');

router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: 'Query is required' });

  try {
    const token = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    const tracks = data.tracks.items.map((track) => ({
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album.name,
      imageUrl: track.album.images?.[0]?.url || ''
    }));

    res.json(tracks);
  } catch (err) {
    console.error('Spotify search error:', err);
    res.status(500).json({ error: 'Failed to fetch from Spotify' });
  }
});

module.exports = router;
