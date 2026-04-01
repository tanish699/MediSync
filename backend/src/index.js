const express = require('express');
const cors = require('cors');
require('dotenv').config();

const exampleRouter = require('./routes/example');
const usersRouter = require('./routes/users');
const familyRouter = require('./routes/family');
const inventoryRouter = require('./routes/inventory');
const remindersRouter = require('./routes/reminders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/example', exampleRouter);
app.use('/api/users', usersRouter);
app.use('/api/family', familyRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/reminders', remindersRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
