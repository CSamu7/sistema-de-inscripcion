const generarToken = require('../helpers/generar-token');
const validarUsuario = require('../helpers/validar-usuario');
const Usuario = require('../model/user.model');

const controladorUsuario = {};

controladorUsuario.consultarUsuario = async (req, res) => {};

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

module.exports = controladorUsuario;
