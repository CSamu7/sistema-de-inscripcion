const form = document.getElementById('form');
const mensaje = document.querySelector('p');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  enviarFormulario();
});

const enviarFormulario = async () => {
  const formData = new FormData(form);

  const numeroDeCuenta = formData.get('numeroDeCuenta');
  const contra = formData.get('contra');

  validarCampos(numeroDeCuenta, contra);

  const solicitud = await getDatos('http://localhost:3000/api/v1/user/', {
    method: 'POST',
    body: formData
  });

  console.log(solicitud);

  return solicitud;
};

const validarCampos = (numero, pass) => {
  try {
    verificarNumeroValido(numero);
    verificarEspaciosVacios(pass);
    verificarTamanioString(pass);
  } catch (err) {
    mensaje.textContent = 'Verifica el numero de cuenta o la contraseña';
  }
};

const verificarNumeroValido = (numero) => {
  let nuevoNumero = parseInt(numero, 10);
  if (Number.isNaN(nuevoNumero)) {
    throw new Error('Error, el dato ingresado no es un numero ');
  }
};
const verificarTamanioString = (pass) => {
  let tamañoCadena = pass.length;
  if (tamañoCadena > 8 || tamañoCadena < 1) {
    throw new Error('Error, numero de caracteres no valido');
  } else if (tamañoCadena === 8) {
    return pass;
  } else {
    throw new Error('Error, numero de caracteres no valido');
  }
};
const verificarEspaciosVacios = (pass) => {
  let numeroEspacios = pass.split(' ');
  let tamanioArreglo = numeroEspacios.length;
  if (tamanioArreglo >= 2) {
    throw new Error('Error, la cadena contiene espacios en blanco');
  }
  return pass;
};

//api fetch
const getDatos = async (url, opciones) => {
  try {
    let respuesta = await fetch(url, opciones);
    let json = await respuesta.json();

    if (!respuesta.ok) {
      throw {
        status: respuesta.status,
        statusText: respuesta.statusText
      };
    }

    return json;
  } catch (e) {
    mensaje.textContent = `No tienes acceso al sistema, verifica los datos`;
  }
};
