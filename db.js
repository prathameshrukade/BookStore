const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'Bookstore',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

// Test DB connection with sample query
promisePool.query('SELECT * FROM authors LIMIT 1')
  .then(([rows]) => {
    console.log('✅ Database connection successful.');
    console.log('Sample row from books table:', rows[0] || 'No data in books table');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });

module.exports = promisePool;