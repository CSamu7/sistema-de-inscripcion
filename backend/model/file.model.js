const BaseDeDatos = require('./db');
const { v4: uuidv4 } = require('uuid');

class FileDB {
  #idArchivo;
  #nombre;
  #ruta;
  #numeroDeCuenta;

  constructor(
    numeroDeCuenta,
    archivo = {
      filename: 'Sin nombre',
      path: '/uploads/'
    }
  ) {
    this.#nombre = archivo.filename;
    this.#ruta = archivo.path;
    this.#numeroDeCuenta = numeroDeCuenta;
    this.#idArchivo = uuidv4();
  }

  async agregarArchivo() {
    const conexion = await BaseDeDatos.conectar();

    const query =
      'INSERT INTO archivo (id_archivo, nombre, ruta, id_usuario) VALUES (?,?,?,?)';

    const [rows] = await conexion.execute(query, [
      this.#idArchivo,
      this.#nombre,
      this.#ruta,
      this.#numeroDeCuenta
    ]);

    if (rows.affectedRows === 0)
      throw new Error({
        status: 405,
        description: 'La subida del archivo ha fallado'
      });

    return rows;
  }

  async eliminarArchivos() {
    const conexion = await BaseDeDatos.conectar();

    const query = 'DELETE FROM archivo WHERE id_usuario = ?';

    const [rows] = await conexion.execute(query, [this.#numeroDeCuenta]);

    if (rows.affectedRows === 0)
      throw new Error({
        status: 405,
        description: 'La eliminacion del archivo ha fallado'
      });

    return rows;
  }
}

module.exports = FileDB;
