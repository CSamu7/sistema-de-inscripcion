const realizarPeticion = async (url, opciones) => {
  try {
    const respuesta = await fetch(url, opciones);

    if (!respuesta.ok) throw { respuesta };

    const json = await respuesta.json();

    return json;
  } catch (e) {
    const mensajeDeError = await e.respuesta.json();

    return mensajeDeError;
  }
};

export { realizarPeticion };
