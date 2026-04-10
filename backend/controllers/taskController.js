const { tasks } = require('../data/store');

const getAll = (req, res) => {
  res.status(200).json(tasks);
};

const create = (req, res) => {
  const { title } = req.body;

  if (title === undefined || title === null) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const trimmed = title.trim();

  if (trimmed === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  if (trimmed.length > 100) {
    return res.status(400).json({ error: 'Title cannot exceed 100 characters' });
  }

  const newTask = {
    id: crypto.randomUUID(),
    title: trimmed,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

const update = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }

  task.completed = completed;
  res.status(200).json(task);
};

const remove = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted' });
};

module.exports = { getAll, create, update, remove };
