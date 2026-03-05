const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventos.controller');

router.get('/eventos', eventosController.listarEventos);
router.get('/eventos/:id', eventosController.buscarEventos);
router.post('/eventos', eventosController.criarEventos);
router.put('/eventos/:id', eventosController.atualizarEventos);
router.delete('/eventos/:id', eventosController.deletarEventos);

module.exports = router;