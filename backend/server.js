const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// DB Check route
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'Database Connected' });
  } catch (err) {
    res.status(500).json({ status: 'Database Connection Failed', error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});