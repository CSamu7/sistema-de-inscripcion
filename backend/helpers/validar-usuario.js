const validarUsuario = (usuario1, usuario2) => {
  if (usuario1.conseguirContrasenia() !== usuario2.conseguirContrasenia())
    throw new Error("Contraseña incorrecta");
};

module.exports = validarUsuario;
