let congress = '113' // 102-115
let chamber = 'senate' // house || senate
const url = `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`;
const apiKey = 'cf9RM1umZPJ6MoCiiFrwPRDF7NjccEPqPMfiTEfv';
const header = {
  method: 'GET',
  headers: {
    'X-API-Key': apiKey
  }
};
var optionsState = new Vue({
  el: '#select_State',
  data: {
    state: []
  }
});
var app = new Vue({
  el: '#senate-data',
  data: {
    senators: []
  },
  methods: {
    linkMember: function(urlMember) {
      window.open(urlMember, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    }
  }
});

function cargarDatos(array) {
  let miembros = array.results[0].members;
  let miembrosfiltrados = aplicarFiltros(miembros);
  app.senators = miembrosfiltrados;
  //Con este return cualquier cambio en las dos variables no afecta al original ,pero cada vez tiene que empezar de nuevo
  // Si desea ver con mas detalles haga console.log a las 3 variables y vea las diferencias al aplicar filtros
  return array;
}

let datos = loadData(url, header);
console.log(datos);
datos.then(result => {
  let opcionesState = filterOptions(result.results[0].members);
  optionsState.state = opcionesState;
  return result;
}); // Añadir las 105 opciones de estado
datos.then(resultado => {
  resultado.results[0].members.forEach(miembro => {
    let fullName;
    miembro.middle_name === null ?
      fullName = `${miembro.first_name} ${miembro.last_name}` :
      fullName = `${miembro.first_name} ${(miembro.middle_name || '')} ${miembro.last_name}`;
    miembro.full_name = fullName;
  });
  return resultado;
}); // Añadir full_name a los miembros
datos.then(result => cargarDatos(result)); //Llamo por primera vez a la funcion para que cargue la tabla
let flechasArriba = document.querySelectorAll('i#flecha-arriba');
flechasArriba = flechasArriba.forEach(flecha => {
  switch (flecha.className) {
    case 'fas fa-angle-up NAME':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, false, 'full_name'));
        datos.then(result => cargarDatos(result));
      });

      break;
    case 'fas fa-angle-up PARTY':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, false, 'party'));
        datos.then(result => cargarDatos(result));
      });
      break;
    case 'fas fa-angle-up STATE':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, false, 'state'));
        datos.then(result => cargarDatos(result));
      });
      break;
    case 'fas fa-angle-up SENIORITY':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, false, 'seniority'));
        datos.then(result => cargarDatos(result));
      });
      break;
    case 'fas fa-angle-up PORCENTAGES':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, false, 'votes_with_party_pct'));
        datos.then(result => cargarDatos(result));
      });
      break;
  }
  return flecha;
});
let flechasAbajo = document.querySelectorAll('i#flecha-abajo');
flechasAbajo = flechasAbajo.forEach(flecha => {
  switch (flecha.className) {
    case 'fas fa-angle-down NAME':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, true, 'full_name'));
        datos.then(result => cargarDatos(result));
      });

      break;
    case 'fas fa-angle-down PARTY':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, true, 'party'));
        datos.then(result => cargarDatos(result));
      });
      break;
    case 'fas fa-angle-down STATE':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, true, 'state'));
        datos.then(result => cargarDatos(result));
      });
      break;
    case 'fas fa-angle-down SENIORITY':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, true, 'seniority'));
        datos.then(result => cargarDatos(result));
      });
      break;
    case 'fas fa-angle-down PORCENTAGES':
      flecha.addEventListener("click", function() {
        datos.then(resultado => sortTable(resultado.results[0].members, true, 'votes_with_party_pct'));
        datos.then(result => cargarDatos(result));
      });
      break;
  }
  return flecha;
});
