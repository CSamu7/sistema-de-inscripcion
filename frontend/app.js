const form = document.getElementById('form');
const notificacion = document.getElementById('notificacion');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  enviarFormulario();
});

const enviarFormulario = async () => {
  const formData = new FormData(form);

  const numeroDeCuenta = formData.get('numeroDeCuenta');
  const contra = formData.get('contra');

  const datosSonValidos = validarCampos(numeroDeCuenta, contra);

  if (!datosSonValidos) return;

  const solicitud = await getDatos('http://localhost:3000/api/v1/user/', {
    method: 'POST',
    body: formData
  });

  if (!solicitud) return;

  notificacion.classList.remove('invisible');
  return solicitud;
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
    notificacion.textContent = `${e.status}: ${e.description}`;
    notificacion.classList.remove('invisible');
  }
};
