const validarTokenJWT = require('../helpers/validar-token-jwt');

const jwtDTO = async (req, res, next) => {
  try {
    const token = req.get('authorization');

    const data = await validarTokenJWT(token);

    req.id = data.payload;

    return next();
  } catch (error) {
    return res.status(403).send({
      error: true,
      description: error.message
    });
  }
};

module.exports = jwtDTO;
