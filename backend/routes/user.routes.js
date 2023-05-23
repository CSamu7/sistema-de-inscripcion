const express = require('express');
const {
  consultarUsuario,
  autenticarUsuario,
  modificarUsuario
} = require('../controller/userController');
const multer = require('multer');
const validarLoginDTO = require('../dto/dto-user');

const usuarioRouter = express.Router();

usuarioRouter.get('/:numeroDeCuenta', consultarUsuario);

usuarioRouter.post('/', [multer().none(), validarLoginDTO]);
usuarioRouter.post('/', autenticarUsuario);

usuarioRouter.patch('/:numeroDeCuenta', modificarUsuario);

module.exports = usuarioRouter;
