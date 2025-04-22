const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const Task = require('./models/Task');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);

sequelize.sync().then(() => {
  console.log('DB sincronizado');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});
