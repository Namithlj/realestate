const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('DB connection error:', err));

// ✅ Export the Express app instead of listening

module.exports = app;
