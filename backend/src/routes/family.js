const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/family - Add a new family member
router.post('/', async (req, res) => {
  try {
    const { user_id, name, relationship, date_of_birth, blood_group, medical_history } = req.body;
    
    if (!user_id || !name) {
      return res.status(400).json({ error: 'user_id and name are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO family_members 
      (user_id, name, relationship, date_of_birth, blood_group, medical_history) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, name, relationship || null, date_of_birth || null, blood_group || null, medical_history || null]
    );

    res.status(201).json({ 
      message: 'Family member created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating family member:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/family/user/:userId - Get family members for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [rows] = await pool.query(
      'SELECT * FROM family_members WHERE user_id = ?',
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching family members:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
