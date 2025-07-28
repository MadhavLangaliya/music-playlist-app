const Playlist = require('../models/Playlist');

// Get all playlists for user
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

exports.getPlaylistById = async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) return res.status(404).json({ message: "Not found" });
  res.json(playlist);
};

// Create new playlist
exports.createPlaylist = async (req, res) => {
  const { name, description } = req.body;
  try {
    const playlist = new Playlist({ userId: req.userId, name, description });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

// Update playlist
exports.updatePlaylist = async (req, res) => {
  const { name, description } = req.body;
  try {
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, description },
      { new: true }
    );
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update playlist' });
  }
};

// Delete playlist
exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
};

const Song = require('../models/Song');

exports.addSongToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { spotifyId, title, artist, album, imageUrl } = req.body;

  try {
    // Save song to DB if not exists
    let song = await Song.findOne({ spotifyId });
    if (!song) {
      song = await new Song({ spotifyId, title, artist, album, imageUrl }).save();
    }

    const playlist = await Playlist.findOne({ _id: playlistId, userId: req.userId });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    if (!playlist.songs.includes(song._id)) {
      playlist.songs.push(song._id);
      await playlist.save();
    }

    res.json({ message: 'Song added to playlist', playlist });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
};
