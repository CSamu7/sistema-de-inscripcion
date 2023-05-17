const BaseDeDatos = require("./db");

class Usuario {
  numeroDeCuenta;
  contrasenia;

  constructor(numeroDeCuenta, contrasenia) {
    this.numeroDeCuenta = Number(numeroDeCuenta);
    this.contrasenia = contrasenia;
  }

  conseguirNumeroDeCuenta() {
    return this.numeroDeCuenta;
  }

  conseguirContrasenia() {
    return this.contrasenia;
  }

  async consultarUsuario() {
    const conexion = await BaseDeDatos.conectar();

    const query = `SELECT numero_de_cuenta, cast(aes_decrypt(contrasenia, ?) as char) as contrasenia, nombre, apellido_paterno, apellido_materno, es_admin FROM usuario WHERE numero_de_cuenta = ?`;

    const [rows] = await conexion.execute(query, [
      process.env.DATABASE_SECRET_KEY,
      this.numeroDeCuenta,
    ]);

    return rows;
  }
}

module.exports = Usuario;
