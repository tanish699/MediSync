const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/reminders - Create a new reminder
router.post('/', async (req, res) => {
  try {
    const { user_id, family_member_id, inventory_item_id, title, description, reminder_time, frequency } = req.body;
    
    if (!user_id || !title || !reminder_time) {
      return res.status(400).json({ error: 'user_id, title, and reminder_time are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO reminders 
      (user_id, family_member_id, inventory_item_id, title, description, reminder_time, frequency) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, 
        family_member_id || null, 
        inventory_item_id || null, 
        title, 
        description || null, 
        reminder_time, 
        frequency || 'Once'
      ]
    );

    res.status(201).json({ 
      message: 'Reminder scheduled successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error scheduling reminder:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/reminders/user/:userId - Get all reminders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Join with family_members and inventory_items to grab readable names
    const query = `
      SELECT r.*, 
             f.name AS family_member_name, 
             i.item_name AS inventory_item_name 
      FROM reminders r 
      LEFT JOIN family_members f ON r.family_member_id = f.id 
      LEFT JOIN inventory_items i ON r.inventory_item_id = i.id 
      WHERE r.user_id = ?
      ORDER BY r.reminder_time ASC
    `;
    
    const [rows] = await pool.query(query, [userId]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/reminders/:id/complete - Mark reminder as completed
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      'UPDATE reminders SET is_completed = TRUE WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json({ message: 'Reminder marked as completed' });
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
