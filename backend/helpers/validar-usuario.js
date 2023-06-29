const validarUsuario = (usuario1, usuario2) => {
  if (!usuario1.consultarNumeroDeCuenta()) throw new Error('Datos incorrectos');

  if (usuario1.consultarContra() !== usuario2.consultarContra())
    throw new Error('Datos incorrectos');
};

module.exports = validarUsuario;
