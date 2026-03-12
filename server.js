require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const eventosRoutes = require('./routes/eventos.routes');

app.use('/api', eventosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});