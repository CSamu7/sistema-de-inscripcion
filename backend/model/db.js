const mysql = require("mysql2/promise");

class BaseDeDatos {
  constructor() {}

  static async conectar() {
    return await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
    });
  }
}

module.exports = BaseDeDatos;
