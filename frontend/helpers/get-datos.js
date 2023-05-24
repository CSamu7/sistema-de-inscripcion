const getDatos = async (url, opciones, error) => {
  try {
    let respuesta = await fetch(url, opciones);
    let json = await respuesta.json();

    if (!respuesta.ok) throw json;

    return json;
  } catch (e) {
    error(e);
  }
};

export { getDatos };
