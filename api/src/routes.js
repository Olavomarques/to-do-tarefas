const express = require('express');
const router = express.Router();

const usuarioController = require('./controllers/usuarioControllers');
const tarefaController = require('./controllers/tarefaControllers');

router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.read);
router.get('/usuarios/:id', usuarioController.readOne);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.remove);

router.post('/tarefas', tarefaController.create);
router.get('/tarefas', tarefaController.read);
router.get('/tarefas/:id', tarefaController.readOne);
router.put('/tarefas/:id', tarefaController.update);
router.delete('/tarefas/:id', tarefaController.remove);
router.patch('/tarefas/:id/prioridade', tarefaController.atualizarPrioridade);
router.patch('/tarefas/:id/status', tarefaController.atualizarStatus);

module.exports = router;