const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/inventory - Add a new inventory item
router.post('/', async (req, res) => {
  try {
    const { user_id, family_member_id, item_name, quantity, unit, expiry_date, description } = req.body;
    
    if (!user_id || !item_name) {
      return res.status(400).json({ error: 'user_id and item_name are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO inventory_items 
      (user_id, family_member_id, item_name, quantity, unit, expiry_date, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, family_member_id || null, item_name, quantity || 0, unit || null, expiry_date || null, description || null]
    );

    res.status(201).json({ 
      message: 'Inventory item added successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/inventory/user/:userId - List inventory for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Using a JOIN to also get the family member's name if applicable
    const [rows] = await pool.query(
      `SELECT i.*, f.name AS family_member_name 
       FROM inventory_items i 
       LEFT JOIN family_members f ON i.family_member_id = f.id 
       WHERE i.user_id = ?
       ORDER BY i.expiry_date ASC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/inventory/:id - Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      'DELETE FROM inventory_items WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
