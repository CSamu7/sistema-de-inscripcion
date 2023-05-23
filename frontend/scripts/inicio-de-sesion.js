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

  const solicitud = await getDatos('http://localhost:3200/api/v1/user/', {
    method: 'POST',
    body: loginData
  });

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

//api fetch
const getDatos = async (url, opciones) => {
  try {
    let respuesta = await fetch(url, opciones);
    let json = await respuesta.json();

    if (!respuesta.ok) throw json;

    return json;
  } catch (e) {
    notificacion.textContent = `${e.status || 'Error'}: ${
      e.description || e.message
    }`;
    notificacion.classList.remove('invisible');
  }
};

const cambiarDePagina = (namePage) => {
  const location = window.location;
  const newPage = `${location.origin}/frontend/pages/${namePage}`;

  location.href = newPage;
};

module.exports = getDatos;