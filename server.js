const express = require('express');
const fetch = require('node-fetch');
const morgan = require('morgan');
const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
app.use(morgan('dev'));

app.get('/todos', async (req, res) => {
  try {
    const doc = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await doc.json();
    data.forEach((element) => {
      delete element.userId;
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const todo = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await todo.json();
    const result = todos.filter((x) => x.userId == req.params.id);
    console.log(result);
    const doc = await fetch(
      `https://jsonplaceholder.typicode.com/users/${req.params.id}`
    );
    const data = await doc.json();
    res.status(200).json({ data, todos: result });
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

app.listen(5000, () => {
  console.log(`Server listening on port 5000`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
