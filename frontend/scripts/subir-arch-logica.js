//constantes
const d = document;
const dropArea = d.querySelector(".drag-and-drop");
const inputArch = d.querySelector('#archivo');
const template = d.querySelector('#lista-archivo').content;
const nodoPadre = d.querySelector('#lista-p');
const fragmento = d.createDocumentFragment();
const extencionValida = ['application/pdf'];
console.log('todo ok');
//funciones
const dragEnter = (e)=>{
    //console.log('Dentro del area');
    e.preventDefault();
    dropArea.classList.add('active'); 
}
const dragLeave = (e)=>{
   // console.log('Fuera del area');
    e.preventDefault();
    dropArea.classList.remove('active'); 
}
const dragOver= (e)=>{
    e.preventDefault();
}
const dropFuncion = (e)=>{
    e.preventDefault();
    let archivo = e.dataTransfer.files;//Guardamos el archivo del usuario
    let valido = validarArchivosPdf(archivo[0]);
    mostrarArchivo(valido);
    dropArea.classList.remove('active');
}
const validarArchivosPdf = (archivo)=>{
    let tipoArchivo = archivo.type;//extraemos el tipo de archivo 
    if(extencionValida.includes(tipoArchivo)){
        console.log('archivo valido');
        return archivo;
        //Archivo valido
    }else{
        console.log('archivo no valido');
        return ; 
        //Archivo no valido
    }
}
const mostrarArchivo = (archivo)=>{
    if(!archivo){
        console.log('No hay archivo');
    }else{
        console.log('Si hay archivo');
        template.querySelector('span').textContent = archivo.name;
        let clone = template.cloneNode(true);
        fragmento.appendChild(clone);
        nodoPadre.appendChild(fragmento);
    }
}
//addEventListener
dropArea.addEventListener('dragenter',dragEnter);
dropArea.addEventListener('dragleave',dragLeave);
dropArea.addEventListener('dragover',dragOver);
dropArea.addEventListener('drop',dropFuncion);
inputArch.addEventListener('change', (e)=>{
    let archivo = inputArch.files;
    console.log('archivo ? : ', archivo);
    let valido = validarArchivosPdf(archivo[0]);
    mostrarArchivo(valido);
});
