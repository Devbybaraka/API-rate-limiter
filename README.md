# Token Bucket Rate Limiter for Express.js

A clean, lightweight, in-memory **Token Bucket Rate Limiter** middleware built from scratch for Express.js applications. 

Designed to handle traffic bursts smoothly while protecting your API endpoints from abuse or accidental flooding.

---

## Features
* **Token Bucket Algorithm:** Allows controlled bursts of traffic while steadily refilling over time.
* **IP-Based Tracking:** Automatically identifies clients via IP or proxy headers (`x-forwarded-for`).
* **Standard HTTP Headers:** Automatically appends rate-limit status headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`).
* **Zero Heavy Dependencies:** Written in vanilla Node.js using core data structures (`Map`).

---

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/token-bucket-rate-limiter.git](https://github.com/YOUR_USERNAME/token-bucket-rate-limiter.git)
   cd token-bucket-rate-limiter