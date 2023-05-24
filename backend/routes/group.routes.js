const express = require('express');
const grupoController = require('../controller/groupController');

const grupoRouter = express.Router();

grupoRouter.get('/', grupoController.consultarTodosLosGrupos);

module.exports = grupoRouter;
