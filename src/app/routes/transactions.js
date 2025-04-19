const express = require('express');
const router = express.Router();
const pool = require('../db');

// routes/transactions.js
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM transactions ORDER BY transaction_date DESC');
    res.json(result.rows);
});
  

router.post('/filter', async (req, res) => {
    const {
      accountId,
      transactionType,
      status,
      minAmount,
      maxAmount,
      startDate,
      endDate
    } = req.body;
  
    let query = 'SELECT * FROM transactions WHERE 1=1';
    const params = [];
    let index = 1;
  
    if (accountId) {
      query += ` AND account_id = $${index++}`;
      params.push(accountId);
    }
  
    if (transactionType) {
      query += ` AND transaction_type = $${index++}`;
      params.push(transactionType);
    }
  
    if (status) {
      query += ` AND status = $${index++}`;
      params.push(status);
    }
  
    if (minAmount) {
      query += ` AND amount >= $${index++}`;
      params.push(minAmount);
    }
  
    if (maxAmount) {
      query += ` AND amount <= $${index++}`;
      params.push(maxAmount);
    }
  
    if (startDate) {
      query += ` AND transaction_date >= $${index++}`;
      params.push(startDate);
    }
  
    if (endDate) {
      query += ` AND transaction_date <= $${index++}`;
      params.push(endDate);
    }
  
    query += ' ORDER BY transaction_date DESC';
  
    try {
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
