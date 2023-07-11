const realizarPeticion = async (url, opciones, error) => {
  try {
    let respuesta = await fetch(url, opciones);

    if (!respuesta.ok)
      throw { statusText: respuesta.statusText, status: respuesta.status };

    let json = await respuesta.json();

    return json;
  } catch (e) {
    console.log(e);
    error(e);
  }
};

export { realizarPeticion };
