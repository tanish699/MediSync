const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/example — basic test route (no DB required)
router.get('/', (req, res) => {
  res.json({ message: 'Hello from Express! 🚀' });
});

// GET /api/example/db — test MySQL connection
router.get('/db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ dbConnected: true, result: rows[0].result });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ dbConnected: false, error: err.message });
  }
});

module.exports = router;
