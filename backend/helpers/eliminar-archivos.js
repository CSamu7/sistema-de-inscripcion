const { unlink } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const eliminarArchivosEnDirectorio = async (req, res, next) => {
  const directorio = `${process.env.FILES_DESTINATION}${req.id.toString()}`;

  const archivosEnDirectorio = fs.readdirSync(directorio);

  for (const archivo of archivosEnDirectorio) {
    await unlink(path.join(directorio, archivo));
  }

  next();
};

module.exports = eliminarArchivosEnDirectorio;
