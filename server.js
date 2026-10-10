// server.js
const express = require('express');
const TokenBucketRateLimiter = require('./ratelimiter');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize limiter: 5 tokens max, refills 5 tokens every 30 seconds
const limiter = new TokenBucketRateLimiter({
  capacity: 5,
  refillRate: 5,
  windowMs: 30000 
});

// Apply rate limiter globally or to specific routes
app.use('/api/', limiter.middleware());

app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    message: 'Request successful! You made it through the rate limiter.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});