const express = require('express');
const {
  consultarUsuario,
  autenticarUsuario
} = require('../controller/userController');
const multer = require('multer');
const validarLoginDTO = require('../dto/dto-user');

const usuarioRouter = express.Router();

usuarioRouter.get('/:iduser', consultarUsuario);

usuarioRouter.post('/', [multer().none(), validarLoginDTO]);
usuarioRouter.post('/', autenticarUsuario);

module.exports = usuarioRouter;
