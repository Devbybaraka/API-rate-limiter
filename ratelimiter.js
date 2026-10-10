
// rateLimiter.js
class TokenBucketRateLimiter {
  constructor({ capacity = 10, refillRate = 1, windowMs = 60000 }) {
    this.capacity = capacity;        
    this.refillRate = refillRate;   
    this.windowMs = windowMs;       
    this.buckets = new Map();       
  }

  middleware() {
    return (req, res, next) => {
      const key = req.ip || req.headers['x-forwarded-for'] || 'default-client';
      const now = Date.now();

     
      let bucket = this.buckets.get(key);
      if (!bucket) {
        bucket = {
          tokens: this.capacity,
          lastRefill: now
        };
        this.buckets.set(key, bucket);
      }

      // Calculate token refill based on elapsed time
      const elapsed = now - bucket.lastRefill;
      const tokensToAdd = (elapsed / this.windowMs) * this.refillRate;
      
      bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;

      //check if token is in the bucket
      if (bucket.tokens < 1) {
        const retryAfter = Math.ceil((this.windowMs - (elapsed % this.windowMs)) / 1000);
        
        res.setHeader('Retry-After', retryAfter);
        res.setHeader('X-RateLimit-Limit', this.capacity);
        res.setHeader('X-RateLimit-Remaining', 0);
        
        return res.status(429).json({
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`
        });
      }

      // Consume one token
      bucket.tokens -= 1;

      // Set standard rate limit headers
      res.setHeader('X-RateLimit-Limit', this.capacity);
      res.setHeader('X-RateLimit-Remaining', Math.floor(bucket.tokens));
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + (this.windowMs - (elapsed % this.windowMs))) / 1000));

      next();
    };
  }
}

module.exports = TokenBucketRateLimiter;