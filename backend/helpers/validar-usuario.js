const validarUsuario = (usuario1, usuario2) => {
  if (!usuario1.conseguirNumeroDeCuenta()) throw new Error('Datos incorrectos');

  if (usuario1.conseguirContra() !== usuario2.conseguirContra())
    throw new Error('Datos incorrectos');
};

module.exports = validarUsuario;
