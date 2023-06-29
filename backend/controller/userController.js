const generarToken = require('../helpers/generar-token');
const validarUsuario = require('../helpers/validar-usuario');
const Usuario = require('../model/user.model');
const validarTokenJWT = require('../helpers/validar-token-jwt');

const controladorUsuario = {};

controladorUsuario.consultarUsuario = async (req, res) => {
  try {
    const token = req.get('authorization');

    const payload = await validarTokenJWT(token);

    const usuario = new Usuario(payload.payload);

    const datosDeUsuario = await usuario.consultarUsuario();

    delete datosDeUsuario[0].contra;

    res.status(200).json(datosDeUsuario);
  } catch (error) {
    //FIXME: Poner mensajes en español
    return res.status(401).json(error);
  }
};

controladorUsuario.autenticarUsuario = async (req, res) => {
  const { numeroDeCuenta, contra } = req.body;

  const usuarioEnFormulario = new Usuario(numeroDeCuenta, contra);
  const usuarioEnBD = await usuarioEnFormulario.consultarUsuario();

  const usuario = new Usuario(
    usuarioEnBD[0].numero_de_cuenta,
    usuarioEnBD[0].contra
  );

  try {
    validarUsuario(usuarioEnFormulario, usuario);

    const token = await generarToken(
      usuarioEnFormulario.consultarNumeroDeCuenta()
    );

    res.set('Authorization', token);

    return res.status(200).json({
      token
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      description: error.message
    });
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

    const archivos = new Usuario(numeroDeCuenta).consultarArchivos();

    return res.status(200).json({
      archivos
    });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

module.exports = controladorUsuario;
