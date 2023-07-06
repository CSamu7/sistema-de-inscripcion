const getDatos = async (url, opciones, error) => {
  try {
    let respuesta = await fetch(url, opciones);

    if (!respuesta.ok) throw new Error('No se pudo');

    let json = await respuesta.json();

    return json;
  } catch (e) {
    error(e);
  }
};

export { getDatos };
