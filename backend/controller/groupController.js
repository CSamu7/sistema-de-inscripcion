const validarTokenJWT = require('../helpers/validar-token-jwt');
const Grupo = require('../model/group.model');

const grupoController = {};

grupoController.consultarGrupo = async (req, res) => {
  try {
    const idGrupo = req.params.idGrupo;
    const token = req.get('authorization');

    await validarTokenJWT(token);

    const grupo = await new Grupo(idGrupo).consultarGrupo();

    res.status(200).json(grupo);
  } catch (error) {
    //TODO: Manejar errores.
    console.log(error);
  }
};

grupoController.consultarTodosLosGrupos = async (req, res) => {
  try {
    const token = req.get('authorization');

    await validarTokenJWT(token);

    const grupo = await new Grupo().consultarTodosLosGrupos();

    res.status(200).json(grupo);
  } catch (error) {
    //TODO: Manejar errores
  }
};

module.exports = grupoController;
