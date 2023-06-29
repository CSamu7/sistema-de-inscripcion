const { Type } = require('@sinclair/typebox');
const Ajv = require('ajv');
const addErrors = require('ajv-errors');

const ajv = new Ajv({
  allErrors: true
})
  .addKeyword('kind')
  .addKeyword('modified');

addErrors(ajv);

const LoginDTOSchema = Type.Object(
  {
    numeroDeCuenta: Type.Number({
      errorMessage: {
        type: 'El numero de cuenta debe ser un numero'
      }
    }),
    contra: Type.String({
      errorMessage: {
        type: 'La contraseña debe ser un string'
      }
    })
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'El formato no es correcto'
    }
  }
);

const validate = ajv.compile(LoginDTOSchema);

const validarLoginDTO = (req, res, next) => {
  req.body.numeroDeCuenta = Number(req.body.numeroDeCuenta);

  const esDTOValido = validate(req.body);

  if (!esDTOValido) {
    return res.status(400).json(
      ajv.errorsText(validate.errors, {
        dataVar: 'dato'
      })
    );
  }

  next();
};

module.exports = validarLoginDTO;
