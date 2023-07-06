const validarTokenJWT = require('../helpers/validar-token-jwt');
const Grupo = require('../model/group.model');

const grupoController = {};

grupoController.consultarTodosLosGrupos = async (req, res) => {
  try {
    const grupo = await new Grupo().consultarTodosLosGrupos();

    res.status(200).json(grupo);
  } catch (error) {
    res.status(error.status).json(error);
  }
};

module.exports = grupoController;
