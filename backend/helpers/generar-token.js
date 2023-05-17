const { SignJWT } = require('jose');

const generarToken = async (payload) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';

  const jwt = await new SignJWT({ payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(secret);

  return jwt;
};

module.exports = generarToken;
