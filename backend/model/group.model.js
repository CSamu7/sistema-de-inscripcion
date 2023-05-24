const BaseDeDatos = require('./db');

class Grupo {
  idGrupo;

  constructor(idGrupo) {
    this.idGrupo = idGrupo;
  }

  async consultarTodosLosGrupos() {
    const query = `SELECT * FROM grupo`;

    const connection = await BaseDeDatos.conectar();

    const [rows] = await connection.execute(query);

    return rows;
  }
}

module.exports = Grupo;
