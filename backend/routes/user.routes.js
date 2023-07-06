const express = require('express');
const {
  consultarUsuario,
  autenticarUsuario,
  modificarGrupo,
  consultarArchivos
} = require('../controller/userController');
const multer = require('multer');
const validarLoginDTO = require('../dto/user-login.dto.js');
const validarPermisos = require('../dto/user-jwt.dto');

const usuarioRouter = express.Router();

usuarioRouter.get('/:numeroDeCuenta', [validarPermisos, consultarUsuario]);

usuarioRouter.post('/', [multer().none(), validarLoginDTO, autenticarUsuario]);

usuarioRouter.patch('/:numeroDeCuenta', [validarPermisos, modificarGrupo]);

usuarioRouter.get('/:numeroDeCuenta/archivos', [
  validarPermisos,
  consultarArchivos
]);

module.exports = usuarioRouter;
