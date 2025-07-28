const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example routes — will be created later
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/playlists', require('./routes/playlistRoutes'));
app.use('/api/spotify', require('./routes/spotifyRoutes'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
}).catch((err) => console.error('DB connection failed:', err));
