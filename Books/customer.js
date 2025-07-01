const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM customers');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const [result] = await db.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email]);
  res.status(201).json({ id: result.insertId });
});

router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const [result] = await db.query('UPDATE customers SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  res.json({ affectedRows: result.affectedRows });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query('DELETE FROM customers WHERE id = ?', [id]);
  res.json({ affectedRows: result.affectedRows });
});

module.exports = router;