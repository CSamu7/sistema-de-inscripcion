import { cambiarDePagina } from '../helpers/cambiar-pagina.js';
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
const modal = document.getElementById('modal');
const btnModal = document.getElementById('btn-modal');
const fragment = document.createDocumentFragment();
/*funciones */

const fallo = (e) => {
  if (e.status === 401) {
    let message = e.description || 'Algo salio mal';
    modal.querySelectorAll('p')[0].textContent = `${message}`;
    modal.showModal();
  }
};

const cargaGrupos = async () => {
  const json = await getDatos(
    'http://localhost:3200/api/v1/grupo',
    {
      headers: {
        authorization: localStorage.getItem('token')
      }
    },
    fallo
  );

  //Agregamos en el select
  for (const grupo of json) {
    templateOption.querySelector('option').textContent = `${grupo.id_grupo}`;
    templateOption.querySelector('option').value = `${grupo.id_grupo}`;
    templateOption.querySelector('option').dataset.id = `${grupo.id_grupo}`;
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
  const [estudiante] = await getDatos(
    'http://localhost:3200/api/v1/user/1',
    {
      headers: {
        authorization: localStorage.getItem('token')
      }
    },
    fallo
  ); //información del alumno

  const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;

  nombreDeAlumno.textContent = `${nombreCompleto}`;
  numeroDeCuenta.textContent = `${estudiante.numero_de_cuenta}`;
};

const enviarConfirmacion = async () => {
  let index = seleccion.selectedIndex;
  let select = seleccion.options[index];
  let idGrupo = select.dataset.id; //obtenemos el id del grupo para enviarlo

  const body = {
    idGrupo
  };

  await getDatos(
    'http://localhost:3200/api/v1/user/1',
    {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('token'),
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    },
    fallo
  );

  cambiarDePagina('finalizacion.html');
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

btnModal.addEventListener('click', (e) => {
  modal.close();
  cambiarDePagina('inicio-de-sesion.html');
});
