// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js App!');
});

// Sample data
let items = [
  { id: 1, name: 'Item 11' },
  { id: 2, name: 'Item 22' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
];

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

// POST - create a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT - update an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

// DELETE - delete an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
