const generarToken = require('../helpers/generar-token');
const validarUsuario = require('../helpers/validar-usuario');
const Usuario = require('../model/user.model');
const validarTokenJWT = require('../helpers/validar-token-jwt');

const controladorUsuario = {};

controladorUsuario.consultarUsuario = async (req, res) => {
  try {
    const token = req.get('authorization');
    //FIXME: FALTA VERIFICAR AQUI
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

  const usuario = new Usuario(numeroDeCuenta, contra);
  const data = await usuario.consultarUsuario();

  const usuarioEnDb = new Usuario(data[0].numero_de_cuenta, data[0].contra);

  try {
    validarUsuario(usuario, usuarioEnDb);

    const token = await generarToken(usuario.conseguirNumeroDeCuenta());

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

controladorUsuario.modificarUsuario = async (req, res) => {
  try {
    const numeroDeCuenta = req.params.numeroDeCuenta;
    const { idGrupo } = req.body;
    const token = req.get('authorization');

    await validarTokenJWT(token);

    const { affectedRows } = await new Usuario(numeroDeCuenta).modificarUsuario(
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

module.exports = controladorUsuario;
