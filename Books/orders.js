const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/orders', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM orders');
  res.json(rows);
});

router.post('/orders', async (req, res) => {
  const { customer_id, order_date } = req.body;
  const [result] = await db.query('INSERT INTO orders (customer_id, order_date) VALUES (?, ?)', [customer_id, order_date]);
  res.status(201).json({ id: result.insertId });
});

router.put('/orders/:id', async (req, res) => {
  const { customer_id, order_date } = req.body;
  const { id } = req.params;
  const [result] = await db.query('UPDATE orders SET customer_id = ?, order_date = ? WHERE id = ?', [customer_id, order_date, id]);
  res.json({ affectedRows: result.affectedRows });
});

router.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
  res.json({ affectedRows: result.affectedRows });
});

module.exports = router;