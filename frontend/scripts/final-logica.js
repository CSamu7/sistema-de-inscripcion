import { cambiarDePagina } from '../helpers/cambiar-pagina.js';
import { getDatos } from '../helpers/get-datos.js';
/*constantes*/
const nombre = document.getElementById('nombre-alumno');
const cuenta = document.getElementById('no-cuenta');
const grupo = document.getElementById('grupo');
const btnVolver = document.getElementById('btn-fin');
const modal = document.getElementById('modal');
const btnModal = document.getElementById('btn-modal');

/*Funciones*/
const cargarAlumno = async () => {
  const [estudiante] = await getDatos(
    `http://localhost:3200/api/v1/user/1`,
    {
      headers: {
        authorization: localStorage.getItem('token')
      }
    },
    fallo
  ); //información del alumno

  let nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;
  nombre.textContent = `${nombreCompleto}`;
  cuenta.textContent = `${estudiante.numero_de_cuenta}`;
  grupo.textContent = `${estudiante.id_grupo}`;
};

const fallo = (e) => {
  if (e.status === 401) {
    modal.querySelectorAll('p')[0].textContent = `${message}`;
    modal.showModal();
  }
};

/*addEventListener*/
document.addEventListener('DOMContentLoaded', (e) => {
  cargarAlumno();
});

btnModal.addEventListener('click', (e) => {
  modal.close();
  cambiarDePagina('inicio-de-sesion.html');
});

btnVolver.addEventListener('click', (e) => {
  cambiarDePagina('inicio-de-sesion.html');
});
