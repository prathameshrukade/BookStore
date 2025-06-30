const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/order-items', require('./routes/orderItems'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});