

const express = require('express');
const router = express.Router();

const authorsRouter = require('./Books/author');
const booksRouter = require('./Books/book');
const categoriesRouter = require('./Books/categories');
const customersRouter = require('./Books/customer');
const ordersRouter = require('./Books/orders');
const orderItemsRouter = require('./Books/order_item');


router.use('/author', authorsRouter);
router.use('/books', booksRouter);
router.use('/categories', categoriesRouter);
router.use('/customers', customersRouter);
router.use('/orders', ordersRouter);
router.use('/order-items', orderItemsRouter);

module.exports = router;
