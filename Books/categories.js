const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM categories');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
  res.status(201).json({ id: result.insertId });
});

router.put('/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
  res.json({ affectedRows: result.affectedRows });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
  res.json({ affectedRows: result.affectedRows });
});

module.exports = router;