const express= require('express');
const router= express.Router();
const db=require("../db");




router.get('/', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(rows[0]);
});



router.post('/', async (req, res) => {
    const { title, author_id, category_id, price, stock, description } = req.body;

    if (!title || !author_id || !category_id || !price || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO books (title, author_id, category_id, price, stock, description) VALUES (?, ?, ?, ?, ?, ?)',
            [title, author_id, category_id, price, stock, description || ""]
        );
        res.status(201).json({ message: "Book created successfully", bookId: result.insertId });
    } catch (err) {
        console.error("Error while inserting data", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/', async (req, res) => {
    const id = req.query.id;
    const {  title, author_id, category_id, price, stock, description } = req.body;

    if ( !title || !author_id || !category_id || !price || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const [result] = await db.query(
            'UPDATE books SET title = ?, author_id = ?, category_id = ?, price = ?, stock = ?, description = ? WHERE id = ?',
            [title, author_id, category_id, price, stock, description || '', id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
        console.error("Error while updating data", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete('/', async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "Missing 'id' in query parameters" });
    }

    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error("Error while deleting data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;