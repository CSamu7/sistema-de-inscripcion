const express = require('express');
const grupoController = require('../controller/groupController');

const grupoRouter = express.Router();

grupoRouter.get('/', grupoController.consultarTodosLosGrupos);
grupoRouter.get('/:idGrupo', grupoController.consultarGrupo);
grupoRouter.patch('/:idGrupo', grupoController.modificarGrupo);

module.exports = grupoRouter;
