const express = require('express');
require('dotenv').config();
const cors = require('cors');

const usuarioRouter = require('../backend/routes/user.routes.js');
const grupoRouter = require('./routes/group.routes.js');
const archivoRouter = require('./routes/file.routes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios/', usuarioRouter);
app.use('/api/v1/grupos/', grupoRouter);
app.use('/api/v1/archivos/', archivoRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Aplicación escuchando');
});
