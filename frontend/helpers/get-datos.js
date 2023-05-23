const getDatos = async (url, opciones) => {
  try {
    let respuesta = await fetch(url, opciones);
    let json = await respuesta.json();

    if (!respuesta.ok) throw json;

    return json;
  } catch (e) {
    console.log(e);

    notificacion.textContent = `${e.status || 'Error'}: ${
      e.description || e.message
    }`;
    notificacion.classList.remove('invisible');
  }
};

export { getDatos };
