const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Use Express to run db
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import all routes
app.use(require('./routes'));

// Using Mongoose to connect to mongodb server when local connection isn't available
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NoSQL-Social-Network-API', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed
mongoose.set('debug', true);

// Displays in console when server is connected and port location
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));