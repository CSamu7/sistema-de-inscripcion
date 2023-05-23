const BaseDeDatos = require('./db');

class Grupo {
  idGrupo;

  constructor(idGrupo) {
    this.idGrupo = idGrupo;
  }

  async consultarGrupo() {
    const query = `SELECT * FROM grupo WHERE id_grupo = ?`;

    const connection = await BaseDeDatos.conectar();

    const [rows] = await connection.execute(query, [this.idGrupo]);

    if (rows.length === 0)
      return [
        {
          idGrupo: 0
        }
      ];

    return rows;
  }

  async consultarTodosLosGrupos() {
    const query = `SELECT * FROM grupo`;

    const connection = await BaseDeDatos.conectar();

    const [rows] = await connection.execute(query);

    return rows;
  }

  async modificarGrupo() {}
}

module.exports = Grupo;
