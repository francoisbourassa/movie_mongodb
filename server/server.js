const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connection à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/movie', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB.');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB.');
});

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Movie = mongoose.model('Movie', movieSchema);

app.use(cors());
app.use(express.json());

// Route pour rechercher un film
app.get('/search', async (req, res) => {
  const query = req.query.title;
  const movie = await Movie.findOne({ title: new RegExp(query, 'i') });
  res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
