const express = require('express');
const grupoController = require('../controller/groupController');
const validarPermisos = require('../dto/user-jwt.dto');

const grupoRouter = express.Router();

grupoRouter.get('/', [
  validarPermisos,
  grupoController.consultarTodosLosGrupos
]);

module.exports = grupoRouter;
