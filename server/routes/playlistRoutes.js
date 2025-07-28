const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist
} = require('../controllers/playlistController');

router.use(verifyToken); // Protect all routes

// GET /api/playlists
router.get('/', getPlaylists);

// POST /api/playlists
router.post('/', createPlaylist);

// PUT /api/playlists/:id
router.put('/:id', updatePlaylist);

// DELETE /api/playlists/:id
router.delete('/:id', deletePlaylist);

router.post('/:playlistId/songs', addSongToPlaylist);


module.exports = router;
