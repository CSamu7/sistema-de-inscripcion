import { cambiarDePagina } from '../helpers/cambiar-pagina.js';
import { getDatos } from '../helpers/get-datos.js';

const login = document.getElementById('login');
const notificacion = document.getElementById('notificacion');

login.addEventListener('submit', (e) => {
  e.preventDefault();
  enviarFormulario();
});

const enviarFormulario = async () => {
  const loginData = new FormData(login);

  const numeroDeCuenta = loginData.get('numeroDeCuenta');
  const contra = loginData.get('contra');

  const datosSonValidos = validarCampos(numeroDeCuenta, contra);

  if (!datosSonValidos) return;

  const solicitud = await getDatos(
    'http://localhost:3200/api/v1/user/',
    {
      method: 'POST',
      body: loginData
    },
    fallo
  );

  if (!solicitud) return;

  notificacion.classList.remove('invisible');

  localStorage.setItem('token', solicitud.token);

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
