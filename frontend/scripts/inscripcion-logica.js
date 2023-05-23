import { getDatos } from '../helpers/get-datos.js';

/*constantes del documento*/
const formulario = document.getElementById('formulario-ins');
const tbody = document.getElementById('tbody');
const seleccion = document.getElementById('select-grupos');
const nombreDeAlumno = document.getElementById('student-name');
const numeroDeCuenta = document.getElementById('student-account');
const templateOption = document.getElementById('template-option').content;
const templateGrupo = document.getElementById('template-grupo').content;
const notificacion = document.getElementById('notificacion');
const fragment = document.createDocumentFragment();
/*funciones */

const cargaGrupos = async () => {
  const json = await getDatos('http://localhost:3200/api/v1/grupo', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  console.log(json);

  //Agregamos en el select
  for (const grupo of json) {
    templateOption.querySelector('option').textContent = `${grupo.id_grupo}`;
    templateOption.querySelector('option').value = `${grupo.id_grupo}`;
    templateOption.querySelector('option').dataset.id=`${grupo.id_grupo}`;
    let clon = templateOption.cloneNode(true);
    fragment.appendChild(clon);
  }
  seleccion.appendChild(fragment);
  //Agregamos en el tbody
  for (const grupo of json) {
    templateGrupo.querySelector('th').textContent = `${grupo.id_grupo}`;
    templateGrupo.querySelectorAll('td')[0].textContent = `${grupo.cantidad_alumnos}`;
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

  nombreDeAlumno.textContent = `${nombreCompleto}`;
  numeroDeCuenta.textContent = `${estudiante.numero_de_cuenta}`;
};

const enviarConfirmacion = async () => {
  let index = seleccion.selectedIndex;
  let select= seleccion.options[index];
  let id = select.dataset.id;//obtenemos el id del grupo para enviarlo

  const enviar = await getDatos('http://localhost:3200/api/v1/user/1', {
    method:'PUT'
    headers: {
      authorization: localStorage.getItem('token')
    });
    body:JSON.stringify({
      id_grupo:id
    })
};
/*addEventListener*/
document.addEventListener('DOMContentLoaded', (e) => {
  cargaGrupos();
  cargaAlumno();
});
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  //enviarConfirmacion();
});
