const express = require('express');
const archivoController = require('../controller/fileController');
const validarPermisos = require('../dto/user-jwt.dto');
const upload = require('../config/multer.config');
const eliminarArchivos = require('../helpers/eliminar-archivos');

const archivoRouter = express.Router();

archivoRouter.post('/:numeroDeCuenta', [
  validarPermisos,
  eliminarArchivos,
  upload.array('file', 2),
  archivoController.añadirArchivos
]);

module.exports = archivoRouter;
