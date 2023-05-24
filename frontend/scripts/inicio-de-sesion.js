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

const verificarNumeroValido = (numero) => {
  let nuevoNumero = parseInt(numero, 10);
  if (Number.isNaN(nuevoNumero)) {
    throw new Error('Error, el dato ingresado no es un numero ');
  }
};

const verificarEspaciosVacios = (numeroDeCuenta, contra) => {
  if (!numeroDeCuenta || !contra) throw new Error('Has dejado espacios vacios');
};

const fallo = (e) => {
  if (e.estatus === 401) {
    let message = e.statusText || 'Algo salio mal';
    notificacion.textContent = 'Error, en la carga de grupos';
    modal.querySelectorAll('p')[0].textContent = `${message}`;
    modal.showModal();
  }
};
