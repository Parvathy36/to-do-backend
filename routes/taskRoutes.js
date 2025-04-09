const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // Import routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://parvathys2026:Parvathy33@sample.99kv3.mongodb.net/sampleDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/tasks', taskRoutes); // Use the task routes

// Basic health check
app.get('/', (req, res) => {
  res.send('Todo List Backend is Running');
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
