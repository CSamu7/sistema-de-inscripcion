const BaseDeDatos = require('./db');

class Usuario {
  numeroDeCuenta;
  contra;

  constructor(numeroDeCuenta, contra) {
    this.numeroDeCuenta = Number(numeroDeCuenta);
    this.contra = contra;
  }

  conseguirNumeroDeCuenta() {
    return this.numeroDeCuenta;
  }

  conseguirContra() {
    return this.contra;
  }

  async consultarUsuario() {
    const conexion = await BaseDeDatos.conectar();

    const query = `SELECT numero_de_cuenta, cast(aes_decrypt(contrasenia, ?) as char) as contra, nombre, apellido_paterno, apellido_materno, es_admin FROM usuario WHERE numero_de_cuenta = ?`;

    const [rows] = await conexion.execute(query, [
      process.env.DATABASE_SECRET_KEY,
      this.numeroDeCuenta
    ]);

    if (rows.length === 0)
      return [
        {
          numero_de_cuenta: 0
        }
      ];

    return rows;
  }

  async modificarUsuario(idGrupo) {
    const conexion = await BaseDeDatos.conectar();

    const query = `UPDATE usuario SET id_grupo = ? WHERE numero_de_cuenta = ?;`;

    const [rows] = await conexion.execute(query, [
      idGrupo,
      this.numeroDeCuenta
    ]);

    if (rows.length === 0)
      return [
        {
          numero_de_cuenta: 0
        }
      ];

    return rows;
  }
}

module.exports = Usuario;
