require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// permitir JSON
app.use(express.json());

// permitir arquivos da pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// rotas
const eventosRoutes = require('./routes/eventos.routes');
const authRoutes = require('./routes/auth.routes');

// usar rotas
app.use('/api', eventosRoutes);
app.use('/api', authRoutes);

// iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
}); //Teste 12/03