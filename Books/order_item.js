const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/order_items', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM order_items');
  res.json(rows);
});

router.post('/order_items', async (req, res) => {
  const { order_id, book_id, quantity, price } = req.body;
  const [result] = await db.query(
    'INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)',
    [order_id, book_id, quantity, price]
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/order_items/:id', async (req, res) => {
  const { order_id, book_id, quantity, price } = req.body;
  const { id } = req.params;
  const [result] = await db.query(
    'UPDATE order_items SET order_id = ?, book_id = ?, quantity = ?, price = ? WHERE id = ?',
    [order_id, book_id, quantity, price, id]
  );
  res.json({ affectedRows: result.affectedRows });
});

router.delete('/order_items/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query('DELETE FROM order_items WHERE id = ?', [id]);
  res.json({ affectedRows: result.affectedRows });
});

module.exports = router;