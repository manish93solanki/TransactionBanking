const express = require('express');
const cors = require('cors');
const transactions = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/transactions', transactions);

app.listen(4000, () => console.log('Server running on port 3000'));
