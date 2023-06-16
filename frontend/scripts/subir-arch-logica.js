import { hacerPeticion } from '../helpers/hacer-peticion.js';

//constantes
const d = document;

const dropArea = d.querySelector('.drag-and-drop');
const inputArch = d.getElementById('input-file');
const btnModal = d.getElementById('btn-modal');
const dragAndDropTexto = d.querySelector('.drag-and-drop__text');
const modal = d.getElementById('modal');
const form = d.getElementById('form-file');

const btnNext = document.getElementById('btn-next');

const extensionesValidas = ['application/pdf'];
const archivos = [];

//funciones
const byteAMb = (byte) => (byte / 1000000).toFixed(2);

const validarArchivos = (listaDeArchivos) => {
  const archivosSubidos = document.querySelectorAll('.file-item');

  if (listaDeArchivos.length > 2 || archivosSubidos.length >= 2) {
    throw new Error('Estas añadiendo mas de dos archivos');
  }

  for (const archivo of listaDeArchivos) {
    const extensionArchivo = archivo.type;
    const pesoArchivo = byteAMb(archivo.size);

    if (!extensionesValidas.includes(extensionArchivo)) {
      throw new Error('El formato es incorrecto');
    }

    if (pesoArchivo > 2) {
      throw new Error('El peso del archivo es mayor a 2MB');
    }

    archivos.push(archivo);
  }

  return listaDeArchivos;
};

const dibujarArchivos = (listaDeArchivos) => {
  const template = d.getElementById('file-list-template').content;
  const nodoPadre = d.getElementById('lista-p');
  const fragmento = d.createDocumentFragment();

  for (const archivo of listaDeArchivos) {
    const size = byteAMb(archivo.size);

    template.querySelector('.file-item__img').src =
      '../assets/img/pdf-logo.png';
    template.querySelector('.file-item__name').textContent = archivo.name;
    template.querySelector('.file-item__quantity').textContent = size;

    let clone = template.cloneNode(true);
    fragmento.appendChild(clone);
    nodoPadre.appendChild(fragmento);
  }
};

const enviarArchivosPorInput = (e) => {
  try {
    validarArchivos(inputArch.files);
    dibujarArchivos(inputArch.files);
    dragAndDropTexto.classList.add('invisible');
  } catch (error) {
    let mensaje =
      error.message || 'Revisa los requisitos de los archivos solicitados';
    modal.querySelector('p').textContent = mensaje;
    modal.showModal();
  }
};

const dragEnter = (e) => {
  e.preventDefault();
  dropArea.classList.add('active');
};

const dragLeave = (e) => {
  e.preventDefault();
  dropArea.classList.remove('active');
};

const dragOver = (e) => {
  e.preventDefault();
};

const enviarArchivosPorDrop = (e) => {
  e.preventDefault();
  const listaDeArchivos = e.dataTransfer.files;

  try {
    validarArchivos(listaDeArchivos);
    dibujarArchivos(listaDeArchivos);
    dragAndDropTexto.classList.add('invisible');
  } catch (error) {
    let mensaje =
      error.message || 'Revisa los requisitos de los archivos solicitados';
    modal.querySelector('p').textContent = mensaje;
    modal.showModal();
  } finally {
    dropArea.classList.remove('active');
  }
};

const enviarArchivosAServidor = async () => {
  const formData = new FormData();

  for (let i = 0; i < archivos.length; i++) {
    console.log(archivos[i].name);
    formData.append('file', archivos[i], archivos[i].name);
  }

  const peticion = await hacerPeticion('http://localhost:3000/api/v1/file', {
    body: formData,
    method: 'POST'
  });
};

//addEventListener
dropArea.addEventListener('dragenter', dragEnter);
dropArea.addEventListener('dragleave', dragLeave);
dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('drop', enviarArchivosPorDrop);
inputArch.addEventListener('change', enviarArchivosPorInput);
btnModal.addEventListener('click', (e) => {
  modal.close();
});

btnNext.addEventListener('click', enviarArchivosAServidor);
