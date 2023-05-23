/*constantes del documento*/
const formulario = document.getElementById('formulario-ins');
const tbody = document.getElementById('tbody');
const seleccion = document.getElementById('select-grupos');
const span_nombre = document.getElementById('student-name');
const span_cuenta = document.getElementById('student-account');
const templateOption = document.getElementById('template-option').content;
const templateGrupo = document.getElementById('template-grupo').content;
const notificacion = document.getElementById('notificacion');
const fragment = document.createDocumentFragment();
/*funciones */
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

const cargaGrupos = async () => {
  const json = await getDatos('http://localhost:3200/api/v1/grupo', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  //Agregamos en el select
  for (const grupo of json) {
    templateOption.querySelector('option').textContent = `${grupo.id_grupo}`;
    templateOption.querySelector('option').value = `${grupo.id_grupo}`;
    let clon = templateOption.cloneNode(true);
    fragment.appendChild(clon);
  }
  seleccion.appendChild(fragment);
  //Agregamos en el tbody
  for (const grupo of json) {
    templateGrupo.querySelector('th').textContent = `${grupo.id_grupo}`;
    templateGrupo.querySelectorAll(
      'td'
    )[0].textContent = `${grupo.cantidad_alumnos}`;
    templateGrupo.querySelectorAll('td')[1].textContent = `${grupo.cupo}`;
    let clon = templateGrupo.cloneNode(true);
    fragment.appendChild(clon);
  }
  tbody.appendChild(fragment);
};

const cargaAlumno = async () => {
  const [estudiante] = await getDatos('http://localhost:3200/api/v1/user/1', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  }); //información del alumno

  const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;

  span_nombre.textContent = `${nombreCompleto}`;
  span_cuenta.textContent = `${estudiante.numero_de_cuenta}`;
};

const enviarConfirmacion = () => {
  const formularioDatos = new FormData(formulario);
  let select = formularioDatos.get('slc-grp');
};
/*addEventListener*/
document.addEventListener('DOMContentLoaded', (e) => {
  cargaGrupos();
  cargaAlumno();
});
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  enviarConfirmacion();
});
