const express = require('express');
const cors = require('cors');

const Book = require('./Books/book');
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

const apiRoutes = require('./index'); 
app.use('/api', apiRoutes);           


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});