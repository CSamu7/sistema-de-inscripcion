const validarUsuario = (usuario1, usuario2) => {
  if (!usuario1.consultarNumeroDeCuenta())
    throw {
      status: 401,
      description: 'La contraseña o el numero de cuenta no es correcto',
      error: true
    };

  if (usuario1.consultarContra() !== usuario2.consultarContra())
    throw {
      status: 401,
      description: 'La contraseña o el numero de cuenta no es correcto',
      error: true
    };
};

module.exports = validarUsuario;
