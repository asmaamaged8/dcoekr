// Import express package
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const os = require('os');
const DB_USER = 'root';
const DB_PASSWORD = "asmaa";
const DB_PORT = 27017;
const DB_HOST = 'mongo';
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Initialize the app
const PORT = process.env.PORT || 4000;
const app = express();

// Redis connection details
const Redis_HOST = 'redis';
const Redis_PORT = 6379;

// Connect to Redis
const redisClient = redis.createClient({
  url: `redis://${Redis_HOST}:${Redis_PORT}`
});

redisClient.on('error', (err) => console.log('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.connect();

// Define route for storing data in Redis
app.get('/', (req, res) => {
  redisClient.set('products', 'products...');
  console.log(`traffic from ${os.hostname}`);
  res.send('<h1> Hello 000 </h1>');
});

// Define route for fetching data from Redis
app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1> Hello 000 </h1> <h2>${products}</h2>`);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`App is running on port: ${PORT}`);
});
