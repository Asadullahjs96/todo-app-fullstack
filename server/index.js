const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const TodoModel = require('./Models/Todo');


const port = process.env.PORT;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err));
});

// Update route
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body.task;
  TodoModel.findByIdAndUpdate(id, { task: updatedTask }, { new: true })
      .then(result => res.json(result))
      .catch(err => res.json(err));
});

// Delete Todo
app.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;

  TodoModel.findByIdAndDelete(taskId)
      .then(() => res.json({ message: 'Todo deleted successfully.' }))
      .catch(err => res.json(err));
});

  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log('DATABASE CONNECTED');
    } catch (error) {
      console.log(error);
    }
  }
  connectDB().then(() => {
    app.listen(process.env.PORT)
  }).catch((err) => {
    console.log(err)
  })