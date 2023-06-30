const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { extname } = require('path');

const MIMETYPES = ['application/pdf'];

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, res, cb) => {
      const directorio = `${process.env.FILES_DESTINATION}${req.id.toString()}`;

      if (!fs.existsSync(directorio)) {
        fs.mkdir(path.join(directorio), { recursive: true }, (err) => {});
      }

      cb(null, directorio);
    },
    filename: async (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];
      const filenameUtf8 = Buffer.from(fileName, 'latin1').toString('utf-8');

      cb(null, `${filenameUtf8}${fileExtension}`);
    }
  }),
  limits: {
    fieldSize: 2000000
  },
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo archivos PDF'));
    }
  }
});

module.exports = upload;
