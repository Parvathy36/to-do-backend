const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://parvathys2026:Parvathy33@sample.99kv3.mongodb.net/sampleDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Task Model
const Task = mongoose.model('Task', { text: String, completed: Boolean });

// Routes
app.get('/api/tasks', async (req, res) => {
  res.json(await Task.find());
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  res.json(await task.save());
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ status: 'deleted' });
  });

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
