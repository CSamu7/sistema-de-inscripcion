const path = require('path');
const generarToken = require('../helpers/generar-token');
const validarUsuario = require('../helpers/validar-usuario');
const Usuario = require('../model/user.model');
const fs = require('fs/promises');
const { error } = require('console');

const controladorUsuario = {};

controladorUsuario.consultarUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.id);

    const datosDeUsuario = await usuario.consultarUsuario();

    delete datosDeUsuario[0].contra;

    res.status(200).json(datosDeUsuario);
  } catch (error) {
    return res.status(401).json(error);
  }
};

controladorUsuario.autenticarUsuario = async (req, res) => {
  const { numeroDeCuenta, contra } = req.body;

  try {
    const usuarioEnFormulario = new Usuario(numeroDeCuenta, contra);
    const usuarioEnBD = await usuarioEnFormulario.consultarUsuario();

    const usuario = new Usuario(
      usuarioEnBD[0].numero_de_cuenta,
      usuarioEnBD[0].contra
    );

    validarUsuario(usuarioEnFormulario, usuario);

    const token = await generarToken(
      usuarioEnFormulario.consultarNumeroDeCuenta()
    );

    res.set('Authorization', token);

    return res.status(200).json({
      token
    });
  } catch (e) {
    console.log(e);
    return res.status(e.status).json(e);
  }
};

controladorUsuario.modificarGrupo = async (req, res) => {
  try {
    const numeroDeCuenta = req.params.numeroDeCuenta;
    const { idGrupo } = req.body;

    const { affectedRows } = await new Usuario(numeroDeCuenta).modificarGrupo(
      idGrupo
    );

    if (affectedRows !== 1)
      throw {
        status: 401,
        description: error.message,
        error: true
      };

    //TODO: Especificar el tipo de mensaje que vamos a enviar
    return res.status(200).json({
      status: 200,
      description: 'El grupo se ha asignado',
      error: false
    });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

controladorUsuario.consultarArchivos = async (req, res) => {
  try {
    const numeroDeCuenta = req.params.numeroDeCuenta;
    const listaDeArchivos = [];

    const archivos = await new Usuario(numeroDeCuenta).consultarArchivos();

    for (const archivo of archivos) {
      const name = archivo.nombre;
      const size = (await fs.stat(archivo.ruta)).size;
      const type = 'application/pdf';
      const link = archivo.ruta;

      const file = { name, size, type, link };

      listaDeArchivos.push(file);
    }

    return res.status(200).json({
      listaDeArchivos
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error);
  }
};

module.exports = controladorUsuario;
