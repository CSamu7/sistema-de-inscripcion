import { cambiarDePagina } from '../helpers/cambiar-pagina.js';
import { realizarPeticion } from '../helpers/realizar-peticion.js';

const login = document.getElementById('login');
const notificacion = document.getElementById('notificacion');

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = await enviarFormulario();
  comprobarInscripcion(usuario);
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
    }
  );

  if (solicitud.error) {
    notificacion.classList.remove('invisible');
    notificacion.textContent = solicitud.description;

    return;
  }

  localStorage.setItem('token', solicitud.token);

  const usuario = {
    numeroDeCuenta,
    solicitud
  };

  return usuario;
};

const comprobarInscripcion = async (usuario) => {
  // FIXME: La función siempre retorna que el usuario ya esta inscrito en el sistema
  // if (!usuario) return;
  // const numeroDeCuenta = usuario.numeroDeCuenta;

  // console.log(localStorage.getItem('token'));

  // const permiso = await realizarPeticion(
  //   `
  // http://localhost:3200/api/v1/usuarios/${numeroDeCuenta}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       authorization: localStorage.getItem('token')
  //     }
  //   }
  // );

  // notificacion.textContent = 'Ya estas inscrito en el sistema';
  // notificacion.classList.remove('invisible');

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
    throw new Error('El numero de cuenta debe que ser un numero');
};

const verificarEspaciosVacios = (numeroDeCuenta, contra) => {
  if (!numeroDeCuenta || !contra) throw new Error('Los campos estan vacios');
};
