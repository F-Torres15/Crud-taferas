const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Criar nova tarefa
router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Listar tarefas
router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// Atualizar tarefa
router.put('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.update(req.body);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.destroy();
    res.json({ message: 'Tarefa excluída' });
  } else {
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

module.exports = router;
