const { jwtVerify } = require('jose');

const validarTokenJWT = async (token) => {
  if (!token) throw new Error('NoJWT');

  const encoder = new TextEncoder();

  try {
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );

    return payload;
  } catch (error) {
    if (error.name === 'JWSSignatureVerificationFailed') {
      throw {
        status: 401,
        description: 'El token no ha sido autenticado',
        error: true
      };
    }

    if (error.name === 'JWTExpired') {
      throw {
        status: 401,
        description: 'El token ha expirado',
        error: true
      };
    }
  }
};

module.exports = validarTokenJWT;
