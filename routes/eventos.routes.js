const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventos.controller');

router.get('/eventos', eventosController.listarEventos);
router.get('/eventos/:id', eventosController.buscarEvento);
router.post('/eventos', eventosController.criarEvento);
router.put('/eventos/:id', eventosController.atualizarEvento);
router.delete('/eventos/:id', eventosController.deletarEvento);

module.exports = router;