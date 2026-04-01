const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/users - Create a new user account
router.post('/', async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;
    
    // Simple validation
    if (!username || !email || !password_hash) {
      return res.status(400).json({ error: 'Username, email, and password_hash are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, password_hash]
    );

    res.status(201).json({ 
      message: 'User created successfully', 
      user: { id: result.insertId, username, email } 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/:id - Fetch user details by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.query(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
