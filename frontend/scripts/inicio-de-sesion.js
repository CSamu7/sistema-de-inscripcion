import { cambiarDePagina } from '../helpers/cambiar-pagina.js';
import { realizarPeticion } from '../helpers/realizar-peticion.js';

const login = document.getElementById('login');
const notificacion = document.getElementById('notificacion');

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = await enviarFormulario();
  inscripcionRealizada(usuario);
});

const enviarFormulario = async () => {
  const loginData = new FormData(login);

  const numeroDeCuenta = loginData.get('numeroDeCuenta');
  const contra = loginData.get('contra');

  const datosSonValidos = validarCampos(numeroDeCuenta, contra);

  if (!datosSonValidos) return;

  const solicitud = await realizarPeticion(
    'http://localhost:3200/api/v1/usuarios/',
    {
      method: 'POST',
      body: loginData
    },
    (e) => {
      console.log(e);
    }
  );

  if (!solicitud) return;

  notificacion.classList.remove('invisible');

  const usuario = {
    numeroDeCuenta,
    solicitud
  };

  return usuario;
};

const inscripcionRealizada = async (usuario) => {
  console.log(usuario);
  if (!usuario) return;

  const numeroDeCuenta = usuario.numeroDeCuenta;

  const permiso = await realizarPeticion(
    `
  http://localhost:3200/api/v1/usuarios/${numeroDeCuenta}/archivos`,
    {
      method: 'GET',
      authorization: localStorage.getItem('token')
    },
    fallo
  );

  if (permiso) {
    notificacion.textContent = 'Ya estas inscrito en el sistema';
    return;
  }

  notificacion.classList.remove('invisible');
  localStorage.setItem('token', usuario.solicitud.token);

  cambiarDePagina('inscripcion.html');
};

const validarCampos = (numero, pass) => {
  try {
    verificarNumeroValido(numero);
    verificarEspaciosVacios(numero, pass);

    return true;
  } catch (err) {
    notificacion.textContent = `${err.message}`;
    notificacion.classList.remove('invisible');

    return;
  }
};

const verificarNumeroValido = (numeroDeCuenta) => {
  const regexNumero = /^\d+$/;

  const numeroDeCuentaEsUnNumero = regexNumero.test(numeroDeCuenta);

  if (!numeroDeCuentaEsUnNumero)
    throw new Error('El numero de cuenta no es un numero');
};

const verificarEspaciosVacios = (numeroDeCuenta, contra) => {
  if (!numeroDeCuenta || !contra) throw new Error('Los campos estan vacios');
};

const fallo = (e) => {
  if (e.status === 401) {
    notificacion.textContent = `${e.status}: ${e.description}`;
    notificacion.classList.remove('invisible');
  }
};
