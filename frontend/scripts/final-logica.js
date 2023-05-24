import { getDatos } from '../helpers/get-datos.js';
/*constantes*/
const nombre = document.getElementById('nombre-alumno');
const cuenta = document.getElementById('no-cuenta');
const grupo = document.getElementById('grupo');
const btnVolver = document.getElementById('btn-fin');
const modal = document.getElementById('modal');
const btnModal = document.getElementById('btn-modal');
console.log(nombre);
/*Funciones*/
const cargarAlumno = async ()=>{
	const [estudiante] = await getDatos('http://localhost:3200/api/v1/user/1', {
    headers: {
      authorization: localStorage.getItem('token')
    }
  },fallo); //información del alumno

	let nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`;
  	nombre.textContent = `${nombreCompleto}`;
  	cuenta.textContent = `${estudiante.numero_de_cuenta}`;
  	grupo.textContent = `${estudiante.id_grupo}`;
};
const fallo = (e)=>{
	console.log(e);
	if(e.status===401){
    	let message = e.statusText || 'Algo salio mal';
    	notificacion.textContent="Error, en la carga de grupos";
    	modal.querySelectorAll('p')[0].textContent=`${message}`
    	modal.showModal();
  	}else{
     	notificacion.textContent = `${e.status || 'Error'}: ${e.description || e.message }`;
    	notificacion.classList.remove('invisible');
  }
};
const cambiarDePagina = (namePage) => {
  const location = window.location;
  const newPage = `${location.origin}/frontend/pages/${namePage}`;
  location.href = newPage;
};
/*addEventListener*/
document.addEventListener('DOMContentLoaded',(e)=>{
 cargarAlumno();
});
btnModal.addEventListener('click',(e)=>{
    modal.close();
    cambiarDePagina('inicio-de-sesion.html');
});