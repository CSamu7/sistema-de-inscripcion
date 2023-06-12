//constantes
const d = document;
const dropArea = d.querySelector('.drag-and-drop');
const inputArch = d.getElementById('archivo');
const template = d.getElementById('file-list-template').content;
const nodoPadre = d.querySelector('#lista-p');
const fragmento = d.createDocumentFragment();
const extensionesValidas = ['application/pdf'];
const dragAndDropTexto = d.querySelector('.drag-and-drop__text');
const modal = d.getElementById('modal');

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
  }

  return listaDeArchivos;
};

const dibujarArchivos = (listaDeArchivos) => {
  if (!archivo) {
  } else {
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
  }
};

const mostrarArchivos = (listaDeArchivos) => {
  try {
    validarArchivos(listaDeArchivos);
    dibujarArchivos(listaDeArchivos);

    dragAndDropTexto.classList.add('invisible');
  } catch (error) {
    console.log(error);
  } finally {
    dropArea.classList.remove('active');
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

const dropFuncion = (e) => {
  e.preventDefault();
  const listaDeArchivos = e.dataTransfer.files;

  mostrarArchivos(listaDeArchivos);
};

//addEventListener
dropArea.addEventListener('dragenter', dragEnter);
dropArea.addEventListener('dragleave', dragLeave);
dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('drop', dropFuncion);
inputArch.addEventListener('change', (e) => {
  const listaDeArchivos = inputArch.files;

  mostrarArchivos(listaDeArchivos);
});
