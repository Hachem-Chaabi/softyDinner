const { v4: uuidv4 } = require('uuid')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

// Middleware to parse JSON
app.use(express.json())

// Enable CORS for all routes
app.use(cors())

// Initial todos data
let todos = [
  { id: uuidv4(), title: 'Todo 1', description: 'Description 1', completed: false },
  { id: uuidv4(), title: 'Todo 2', description: 'Description 2', completed: false },
  { id: uuidv4(), title: 'Todo 3', description: 'Description 3', completed: true },
  { id: uuidv4(), title: 'Todo 4', description: 'Description 4', completed: false },
  { id: uuidv4(), title: 'Todo 5', description: 'Description 5', completed: false },
  { id: uuidv4(), title: 'Todo 6', description: 'Description 6', completed: false },
  { id: uuidv4(), title: 'Todo 7', description: 'Description 7', completed: true },
  { id: uuidv4(), title: 'Todo 8', description: 'Description 8', completed: true },
  { id: uuidv4(), title: 'Todo 9', description: 'Description 9', completed: false },
  { id: uuidv4(), title: 'Todo 10', description: 'Description 10', completed: false },
  { id: uuidv4(), title: 'Todo 11', description: 'Description 11', completed: true },
  { id: uuidv4(), title: 'Todo 12', description: 'Description 12', completed: false },
]

// Get all todos
app.get('/api/todos', (req, res) => {
  const page = parseInt(req.query.page) || 1 // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10 // Default to 10 items per page if not provided

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const paginatedTodos = todos.slice(startIndex, endIndex)

  res.json({
    page,
    limit,
    total: todos.length,
    data: paginatedTodos,
  })
})

// Get a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id)
  if (todo) {
    res.json(todo)
  } else {
    res.status(404).json({ message: 'Todo not found' })
  }
})

// Create a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// Update a todo by ID
app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === req.params.id)
  if (todo) {
    todo.title = req.body.title || todo.title
    todo.description = req.body.description || todo.description
    todo.completed = req.body.completed ?? todo.completed
    res.json(todo)
  } else {
    res.status(404).json({ message: 'Todo not found' })
  }
})

// Delete a todo by ID
app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === req.params.id)
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
    res.json({ message: 'Todo deleted' })
  } else {
    res.status(404).json({ message: 'Todo not found' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
