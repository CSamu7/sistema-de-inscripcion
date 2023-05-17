const validarUsuario = (usuario1, usuario2) => {
  if (usuario1.conseguirContra() !== usuario2.conseguirContra())
    throw new Error('Contraseña incorrecta');
};

module.exports = validarUsuario;
