const BaseDeDatos = require('./db');

class Usuario {
  numeroDeCuenta;
  contra;

  constructor(numeroDeCuenta, contra) {
    this.numeroDeCuenta = Number(numeroDeCuenta);
    this.contra = contra;
  }

  consultarNumeroDeCuenta() {
    return this.numeroDeCuenta;
  }

  consultarContra() {
    return this.contra;
  }

  async consultarUsuario() {
    const conexion = await BaseDeDatos.conectar();

    const query = `SELECT numero_de_cuenta, cast(aes_decrypt(contra, ?) as char) as contra, nombre, apellido_paterno, apellido_materno, es_admin, id_grupo FROM usuario WHERE numero_de_cuenta = ?`;

    const [rows] = await conexion.execute(query, [
      process.env.DATABASE_SECRET_KEY,
      this.numeroDeCuenta
    ]);

    if (rows.length === 0)
      throw {
        status: 401,
        description: 'La contraseña o el numero de cuenta no es correcto',
        error: true
      };

    return rows;
  }

  async modificarGrupo(idGrupo) {
    const conexion = await BaseDeDatos.conectar();

    const query = `UPDATE usuario SET id_grupo = ? WHERE numero_de_cuenta = ?;`;

    const [rows] = await conexion.execute(query, [
      idGrupo,
      this.numeroDeCuenta
    ]);

    if (rows.length === 0)
      throw {
        status: 405,
        description: 'No has sido añadido al grupo',
        error: true
      };

    return rows;
  }

  async consultarArchivos() {
    const conexion = await BaseDeDatos.conectar();

    const query = `SELECT * FROM archivo WHERE id_usuario = ?`;

    const [rows] = await conexion.execute(query, [this.numeroDeCuenta]);

    return rows;
  }
}

module.exports = Usuario;
