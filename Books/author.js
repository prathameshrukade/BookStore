const express = require('express');
const router1 = express.Router();
const db = require('../db');

router1.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM authors');
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching authors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router1.get('/:id', async (req, res) => {
    
    try {
        const [rows] = await db.query("SELECT * FROM authors where id = ?", [req.params.id]);
      res.json(rows[0]);
    } catch (err) {
      console.error("Error fetching authors:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router1;
