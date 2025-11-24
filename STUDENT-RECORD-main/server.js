require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB(process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.get('/', (req, res) => res.send('Student Record API is running'));
app.use('/students', require('./routes/students'));

// Global error handler fallback (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
