const { jwtVerify } = require('jose');

const validarTokenJWT = async (token) => {
  if (!token) throw new Error('No estas autorizado');

  const encoder = new TextEncoder();

  try {
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );

    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports = validarTokenJWT;
