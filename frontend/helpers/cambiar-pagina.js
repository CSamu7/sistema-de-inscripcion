const cambiarDePagina = (namePage) => {
  const location = window.location;
  const newPage = `${location.origin}/frontend/pages/${namePage}`;

  location.href = newPage;
};

export { cambiarDePagina };
