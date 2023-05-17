const formulario = document.getElementById('formulario1');
const mensaje = document.querySelector('p');

formulario.addEventListener('submit',(e)=>{
	e.preventDefault();
	validar();
});

const validar =  () =>{
		const nombre=formulario.querySelector('#no_cuenta').value;
		const contra=formulario.querySelector('#contra').value;
	 	const usuario= validarCampos(nombre,contra);
	 	if (!usuario) {
	 		
	 		console.log('Los datos no fueron correctos: ', usuario);
	 		//no se puede hacer una consulta a la base de datos
	 	}else {
	 		mensaje.textContent=`Tus datos se estan verificando...`;
	 		console.log(usuario);
	 		//se puede hacer una consulta a la base de datos
	 		getDatos(usuario);//pasamos como argumento el objeto usuario
	 		
	 	}
	
	// 	window.location.assign('vainilla.html');//	Envia al usuario a la siguiente pagina
	
}
const validarCampos = (numero,pass)=>{
	try {
		console.log("Inicio de validaciones");

		let no_cuenta = verificarNumeroValido(numero);
		let contrasenia = verificarEspaciosVacios(pass);
		contrasenia =  verificarTamanioString(contrasenia);
		console.log('Los datos estan listos para enviarse a la base de datos ');
		const usuario ={
			no_cuenta,
			contrasenia
		}
		return usuario;

	} catch(err) {
		console.error(err.message);
		mensaje.textContent='Verifica el numero de cuenta o la contraseña';
	}
}
const verificarNumeroValido= (numero)=> {
	let nuevoNumero = parseInt(numero, 10);
	if(Number.isNaN(nuevoNumero)){
		throw new Error ('Error, el dato ingresado no es un numero ');
	}else {
		return nuevoNumero;
	}
	
}
const verificarTamanioString =(pass)=> {
	let tamañoCadena = pass.length;
	if (tamañoCadena >8 || tamañoCadena <1) {
		throw new Error('Error, numero de caracteres no valido');
	}else if(tamañoCadena === 8){
		return pass;
	}else {
		throw new Error('Error, numero de caracteres no valido');
	}
}
const verificarEspaciosVacios= (pass) =>{
	let numeroEspacios =pass.split(' ');
	let tamanioArreglo =numeroEspacios.length;
	if(tamanioArreglo >= 2){
		throw new Error('Error, la cadena contiene espacios en blanco');
	}
	return pass;
}

//api fetch 
const getDatos= async (argument={})=>{
	try {
		const opciones={
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(argument);
		}
		let respuesta = await fetch("localhost:3000/api/v1/user/", opciones);
		let json = await respuesta.json();
		if (!respuesta.ok) {
			throw {
				status: respuesta.status,
				statusText: respuesta.statusText
			}
		}
		//window.location.assing('#'); //enviamos al usuraio a la siguiente pagina

	} catch(e) {
		console.error('status: ',e.status);
		mensaje.textContent=`No tienes acceso al sistema, verifica los datos`;
	}
}