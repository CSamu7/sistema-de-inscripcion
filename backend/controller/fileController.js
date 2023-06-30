const FileDB = require('../model/file.model');
const Usuario = require('../model/user.model');

const archivoController = {};

archivoController.añadirArchivos = async (req, res) => {
  try {
    const hayArchivosExistentes = await new Usuario(req.id).consultarArchivos();

    if (hayArchivosExistentes.length !== 0) {
      await new FileDB(req.id).eliminarArchivos();
    }

    for (const archivo of req.files) {
      await new FileDB(req.id, archivo).agregarArchivo();
    }

    res.status(200).json('Hola');
  } catch (error) {
    res.status(error.status).json(error);
  }
};

module.exports = archivoController;
